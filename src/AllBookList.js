import {Link} from "react-router-dom";
import ShelfList from "./ShelfList";




const AllBookList = ({bookCollection, onShelfChange}) => {
    console.log("allBookList")
    console.log(bookCollection)
    const currentShelf = bookCollection.filter((item) =>
        item.shelf === "currentlyReading"
    );
    const wantShelf = bookCollection.filter((item) =>
        item.shelf === "wantToRead"
    );
    const readShelf = bookCollection.filter((item) =>
        item.shelf === "read"
    );

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <ShelfList shelfName={"Currently Reading"} books={currentShelf} onShelfChange={onShelfChange}/>
                    <ShelfList shelfName={"Want to Read"} books={wantShelf} onShelfChange={onShelfChange}/>
                    <ShelfList shelfName={"Read"} books={readShelf} onShelfChange={onShelfChange}/>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

export default AllBookList