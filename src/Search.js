import {Link} from "react-router-dom";
import ShelfList from "./ShelfList";

const Search = ({searchBooksCollection, onShelfChange, onChangeTerm}) => {

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    className="close-search"
                    to="/">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={onChangeTerm}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid"></ol>
            </div>
            <ShelfList shelfName={"Search"} books={searchBooksCollection} onShelfChange={onShelfChange}/>
        </div>
    )
}

export default Search