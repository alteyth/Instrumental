import React, { userState } from "react";
import styles from "./SearchBar.module.css";
import { useSession } from "../../context/SessionContext";

function SearchBar() {
    const {setSearchTerm} = useSession();

    function search(e){
        e.preventDefault();
        const formElement = e.target.elements;
        const searchedItem = formElement.searchbar.value;
        setSearchTerm(searchedItem);
    }

    return (
        <>
            <form onSubmit={search} className={styles.searchForm}>
            <input
                type="text"
                placeholder="Search.."
                name="searchbar"
                id="searchbar"
                className={styles.searchbar}
            />
            
            </form>
        </>
    );
}

export default SearchBar;
