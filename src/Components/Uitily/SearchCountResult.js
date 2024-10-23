import React from 'react'
import UnopDropdown from "unop-react-dropdown";
import sort from '../../images/sort.png'
const SearchCountResult = ({ title ,onClick}) => {
    const handler = () => {

    }
    const clickMe = (key) => {
        localStorage.setItem("sortType", key)
        onClick();
    }
    return (
        <div className="d-flex justify-content-between pt-3 px-2">
            <div className="sub-tile">{title}</div>
            <div className="search-count-text d-flex ">
              
            </div>
        </div>
    )
}

export default SearchCountResult
