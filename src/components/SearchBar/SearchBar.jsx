import React, { userState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar() {
    return (
        <>
            <input
                type="text"
                placeholder="Search.."
                className={styles.searchbar}
            />
        </>
    );
}

export default SearchBar;
