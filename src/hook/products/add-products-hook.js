import React, { useState, useEffect } from 'react';
import { getOneCategory } from '../../redux/actions/subcategoryAction';
import { createProduct } from '../../redux/actions/productsAction';
import notify from './../../hook/useNotifaction';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../redux/actions/categoryAction';
import { getAllBrand } from './../../redux/actions/brandAction';

const AdminAddProductsHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(getAllBrand());
    }, [dispatch]);

    // Get category, brand, and sub-category state from redux
    const category = useSelector(state => state.allCategory.category);
    const brand = useSelector(state => state.allBrand.brand);
    const subCat = useSelector(state => state.subCategory.subcategory);

    const [options, setOptions] = useState([]);
    const [images, setImages] = useState([]);
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState('');
    const [priceAftr, setPriceAftr] = useState('');
    const [qty, setQty] = useState('');
    const [CatID, setCatID] = useState('');
    const [BrandID, setBrandID] = useState('');
    const [seletedSubID, setSeletedSubID] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showColor, setShowColor] = useState(false);
    const [colors, setColors] = useState([]);

    // Handle selection of subcategories
    const onSelect = (selectedList) => {
        setSeletedSubID(selectedList);
    };

    // Handle removal of subcategories
    const onRemove = (selectedList) => {
        setSeletedSubID(selectedList);
    };

    // Handle input changes
    const onChangeProdName = (e) => setProdName(e.target.value);
    const onChangeDesName = (e) => setProdDescription(e.target.value);
    const onChangePriceBefore = (e) => setPriceBefore(e.target.value);
    const onChangePriceAfter = (e) => setPriceAftr(e.target.value);
    const onChangeQty = (e) => setQty(e.target.value);

    // Toggle color picker visibility
    const onChangeColor = () => setShowColor(!showColor);

    // Handle color change
    const handelChangeComplete = (color) => {
        setColors([...colors, color.hex]);
        setShowColor(false);
    };

    // Remove a color from the list
    const removeColor = (color) => {
        const newColor = colors.filter((e) => e !== color);
        setColors(newColor);
    };

    // Handle category selection
    const onSeletCategory = async (e) => {
        const value = e.target.value;
        if (value !== "") {
            await dispatch(getOneCategory(value));
        }
        setCatID(value);
    };

    useEffect(() => {
        if (CatID !== "") {
            if (subCat.data) {
                setOptions(subCat.data);
            }
        } else {
            setOptions([]);
        }
    }, [CatID, subCat]);

    // Handle brand selection
    const onSeletBrand = (e) => {
        setBrandID(e.target.value);
    };

    // Convert base64 to file
    const dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    };

    // Handle form submission
    const handelSubmit = async (e) => {
        e.preventDefault();
        if (CatID === "" || prodName === "" || prodDescription === "" || images.length === 0 || priceBefore === "") {
            notify("Please complete the data", "warn");
            return;
        }

        const imgCover = dataURLtoFile(images[0], Math.random() + ".png");
        const itemImages = Array.from(Array(Object.keys(images).length).keys()).map((item, index) => {
            return dataURLtoFile(images[index], Math.random() + ".png");
        });

        const formData = new FormData();
        formData.append("title", prodName);
        formData.append("description", prodDescription);
        formData.append("quantity", qty);
        formData.append("price", priceBefore);
        formData.append("priceAfterDiscount", priceAftr);
        formData.append("category", CatID);
        formData.append("brand", BrandID);
        formData.append("imageCover", imgCover);
        itemImages.forEach((item) => formData.append("images", item));
        colors.forEach((color) => formData.append("availableColors", color));
        seletedSubID.forEach((item) => formData.append("subcategory", item._id));

        setLoading(true);
        await dispatch(createProduct(formData));
        setLoading(false);
    };

    const product = useSelector(state => state.allproducts.products);

    useEffect(() => {
        if (!loading) {
            setCatID("");
            setColors([]);
            setImages([]);
            setProdName('');
            setProdDescription('');
            setPriceBefore('');
            setPriceAftr('');
            setQty('');
            setBrandID('');
            setSeletedSubID([]);

            if (product && product.status) {
                if (product.status === 201) {
                    notify("Added successfully", "success");
                } else {
                    notify("There was a problem", "error");
                }
            }
        }
    }, [loading, product]);

    return [
        onChangeDesName,
        onChangeQty,
        onChangeColor,
        onChangePriceAfter,
        onChangePriceBefore,
        onChangeProdName,
        showColor,
        category,
        brand,
        priceAftr,
        images,
        setImages,
        onSelect,
        onRemove,
        options,
        handelChangeComplete,
        removeColor,
        onSeletCategory,
        handelSubmit,
        onSeletBrand,
        colors,
        priceBefore,
        qty,
        prodDescription,
        prodName
    ];
};

export default AdminAddProductsHook;
