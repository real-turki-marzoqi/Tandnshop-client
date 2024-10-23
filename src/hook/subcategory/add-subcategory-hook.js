import React, { useEffect, useState } from 'react';
import { createSubCategory } from '../../redux/actions/subcategoryAction';
import { useSelector, useDispatch } from 'react-redux';
import notify from '../../hook/useNotifaction';
import { getAllCategory } from '../../redux/actions/categoryAction';

const useAddSubcategoryHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!navigator.onLine) {
            notify("There is an issue with the internet connection", "warn");
            return;
        }
        dispatch(getAllCategory());
    }, [dispatch]);

    const [id, setID] = useState('0');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    // Get the latest category state from redux
    const category = useSelector(state => state.allCategory.category);

    // Get the latest subcategory state from redux
    const subcategory = useSelector(state => state.subCategory.subcategory);

    // Handle change in dropdown menu
    const handelChange = (e) => {
        console.log(e.target.value);
        setID(e.target.value);
    };

    // Save the name
    const onChangeName = (e) => {
        e.persist();
        setName(e.target.value);
    };

    // Handle form submission
    const handelSubmit = async (e) => {
        e.preventDefault();
        if (!navigator.onLine) {
            notify("There is an issue with the internet connection", "warn");
            return;
        }
        if (id === "0") {
            notify("Please select a main category", "warn");
            return;
        }
        if (name === "") {
            notify("Please enter the subcategory name", "warn");
            return;
        }

        setLoading(true);
        await dispatch(createSubCategory({
            name,
            category: id
        }));
        setLoading(false);
    };

    useEffect(() => {
        if (loading === false) {
            setName("");
            setID("0");
            if (subcategory)
                console.log(subcategory);
            if (subcategory.status === 201) {
                notify("Subcategory added successfully", "success");
            } else if (subcategory === "Error Error: Request failed with status code 400") {
                notify("This name is already in use, please choose another", "warn");
            } else {
                notify("There was an issue with the addition process", "warn");
            }

            setLoading(true);
        }
    }, [loading, subcategory]);

    return [id, name, loading, category, subcategory, handelChange, handelSubmit, onChangeName];
};

export default useAddSubcategoryHook;
