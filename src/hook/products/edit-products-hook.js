import React, { useState, useEffect } from 'react';
import { getOneCategory } from '../../redux/actions/subcategoryAction';
import { createProduct, getOneProduct } from '../../redux/actions/productsAction';
import notify from './../../hook/useNotifaction';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../redux/actions/categoryAction';
import { getAllBrand } from './../../redux/actions/brandAction';
import { updateProducts } from './../../redux/actions/productsAction';
import baseUrl from './../../Api/baseURL';

const AdminEditProductsHook = (id) => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        const run = async () => {
            await dispatch(getOneProduct(id));
            await dispatch(getAllCategory());
            await dispatch(getAllBrand());
        };
        run();
    }, []);

    // Get product details
    const item = useSelector((state) => state.allproducts.oneProduct);
    // Get the latest category state from redux
    const category = useSelector(state => state.allCategory.category);
    // Get the latest brand state from redux
    const brand = useSelector(state => state.allBrand.brand);
    // Get the latest subcategory state from redux
    const subCat = useSelector(state => state.subCategory.subcategory);

    const onSelect = (selectedList) => {
        setSeletedSubID(selectedList);
    };

    const onRemove = (selectedList) => {
        setSeletedSubID(selectedList);
    };

    const [options, setOptions] = useState([]);

    // Product image values
    const [images, setImages] = useState([]);
    // State values
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState('Price before discount');
    const [priceAftr, setPriceAftr] = useState('Price after discount');
    const [qty, setQty] = useState('Available quantity');
    const [CatID, setCatID] = useState('0');
    const [BrandID, SetBrandID] = useState('0');
    const [subCatID, setSubCatID] = useState([]);
    const [seletedSubID, setSeletedSubID] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (item.data) {
            console.log(item.data.images);
            setImages(item.data.images);
            setProdName(item.data.title);
            setProdDescription(item.data.description);
            setPriceBefore(item.data.price);
            setQty(item.data.quantity);
            setCatID(item.data.category);
            SetBrandID(item.data.brand);
            setColors(item.data.availableColors);
        }
    }, [item]);

    // Handle input changes
    const onChangeProdName = (event) => {
        event.persist();
        setProdName(event.target.value);
    };

    const onChangeDesName = (event) => {
        event.persist();
        setProdDescription(event.target.value);
    };

    const onChangePriceBefor = (event) => {
        event.persist();
        setPriceBefore(event.target.value);
    };

    const onChangePriceAfter = (event) => {
        event.persist();
        setPriceAftr(event.target.value);
    };

    const onChangeQty = (event) => {
        event.persist();
        setQty(event.target.value);
    };

    const onChangeColor = (event) => {
        event.persist();
        setShowColor(!showColor);
    };

    // To show/hide the color picker
    const [showColor, setShowColor] = useState(false);
    // To store all picked colors
    const [colors, setColors] = useState([]);
    // When selecting a new color
    const handelChangeComplete = (color) => {
        setColors([...colors, color.hex]);
        setShowColor(!showColor);
    };

    const removeColor = (color) => {
        const newColor = colors.filter((e) => e !== color);
        setColors(newColor);
    };

    // Store the selected category ID
    const onSeletCategory = async (e) => {
        setCatID(e.target.value);
    };

    useEffect(() => {
        if (CatID != 0) {
            const run = async () => {
                await dispatch(getOneCategory(CatID));
            };
            run();
        }
    }, [CatID]);

    useEffect(() => {
        if (subCat) {
            setOptions(subCat.data);
        }
    }, [subCat]);

    // Store the selected brand ID
    const onSeletBrand = (e) => {
        SetBrandID(e.target.value);
    };

    // Convert base64 to file
    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    // Convert URL to file
    const convertURLtoFile = async (url) => {
        const response = await fetch(url, { mode: "cors" });
        const data = await response.blob();
        const ext = url.split(".").pop();
        const filename = url.split("/").pop();
        const metadata = { type: `image/${ext}` };
        return new File([data], Math.random(), metadata);
    };

    // Save data
    const handelSubmit = async (e) => {
        e.preventDefault();
        if (CatID === 0 || prodName === "" || prodDescription === "" || images.length <= 0 || priceBefore <= 0) {
            notify("Please complete the data", "warn");
            return;
        }
        console.log(images[0]);
        let imgCover;
        if (images[0].length <= 1000) {
            convertURLtoFile(images[0]).then(val => imgCover = val);
        } else {
            imgCover = dataURLtoFile(images[0], Math.random() + ".png");
        }

        let itemImages = [];
        // Convert array of base64 images to file
        Array.from(Array(Object.keys(images).length).keys()).map(
            (item, index) => {
                if (images[index].length <= 1000) {
                    convertURLtoFile(images[index]).then(val => itemImages.push(val));
                }
                else {
                    itemImages.push(dataURLtoFile(images[index], Math.random() + ".png"));
                }
            });

        const formData = new FormData();
        formData.append("title", prodName);
        formData.append("description", prodDescription);
        formData.append("quantity", qty);
        formData.append("price", priceBefore);
        formData.append("category", CatID);
        formData.append("brand", BrandID);

        setTimeout(() => {
            formData.append("imageCover", imgCover);
            itemImages.map((item) => formData.append("images", item));
        }, 1000);

        setTimeout(() => {
            console.log(imgCover);
            console.log(itemImages);
        }, 1000);

        colors.map((color) => formData.append("availableColors", color));
        seletedSubID.map((item) => formData.append("subcategory", item._id));

        setTimeout(async () => {
            // setLoading(true)
            //   await dispatch(updateProducts(id, formData))
            //  setLoading(false)
        }, 1000);
    };

    // Get the update product message
    const product = useSelector(state => state.allproducts.updateProducts);

    useEffect(() => {
        if (loading === false) {
            setColors([]);
            setImages([]);
            setProdName('');
            setProdDescription('');
            setPriceBefore('Price before discount');
            setPriceAftr('Price after discount');
            setQty('Available quantity');
            SetBrandID(0);
            setSeletedSubID([]);
            setTimeout(() => setLoading(true), 1500);

            if (product) {
                if (product.status === 200) {
                    notify("Successfully updated", "success");
                } else {
                    notify("There was a problem", "error");
                }
            }
        }
    }, [loading]);

    return [CatID, BrandID, onChangeDesName, onChangeQty, onChangeColor, onChangePriceAfter, onChangePriceBefor, onChangeProdName, showColor, category, brand, priceAftr, images, setImages, onSelect, onRemove, options, handelChangeComplete, removeColor, onSeletCategory, handelSubmit, onSeletBrand, colors, priceBefore, qty, prodDescription, prodName];

};

export default AdminEditProductsHook;
