import React from "react";
import styles from "./SearchBar.module.css";
import { useSession } from "../../context/SessionContext";

function SearchBar() {
    const { setSearchTerm } = useSession();

    // Lo stato searchTerm fa in modo che la home page venga ricaricata per mostrare solo i prodotti inerenti
    function search(e) {
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
                <button type="submit" className={styles.searchButton}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </>
    );
}

export default SearchBar;
