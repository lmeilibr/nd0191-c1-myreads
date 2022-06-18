import Book from "./Book";

const ShelfList = ({shelfName, books, onShelfChange}) => {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.length === 0 ? <p>No Results</p> : books.map((item) => {
                        return (
                            <li key={item.id}>
                                <Book metadata={item} onShelfChange={onShelfChange}/>
                            </li>)
                    })}
                </ol>
            </div>
        </div>
    )
}

export default ShelfList