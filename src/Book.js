const ShelfSelector = ({metadata, handle}) => {

    return (
        <div className="book-shelf-changer">
            <select value={metadata.shelf} onChange={(event) => handle(event, metadata)}>
                <option value="none" disabled> Move to...</option>
                <option value="currentlyReading"> Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}

const Book = ({metadata, onShelfChange}) => {

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={metadata.style}
                ></div>
                <ShelfSelector metadata={metadata} handle={onShelfChange}/>
            </div>
            <div className="book-title">{metadata.bookname}</div>
            <div className="book-authors">{metadata.author}</div>
        </div>
    )
}

export default Book