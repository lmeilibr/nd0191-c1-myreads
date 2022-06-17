import "./App.css";
import {Route, Routes} from "react-router-dom";
import Search from "./Search";
import AllBookList from "./AllBookList";
import {useEffect, useState} from "react";
import {getAll, search, update} from "./BooksAPI";


function App() {

    const [searchBooks, setSearchBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    function bookParser(searchList) {
        const parseBooks = searchList.map((book) => {
            return {
                shelf: book.shelf,
                id: book.id,
                bookname: book.title,
                author: "authors" in book ? book.authors[0] : "",
                style: {
                    width: 128,
                    height: 190,
                    backgroundImage: "imageLinks" in book ? `url(${book.imageLinks.thumbnail}` : ''
                }
            };
        })
        return parseBooks;
    }

    useEffect(() => {
            const getSearchBooks = async () => {
                const res = await search(searchTerm);

                let searchList = res || []

                if (res === undefined || 'error' in res) {
                    searchList = []
                } else {
                    searchList = res
                }

                const parseBooks = bookParser(searchList);
                setSearchBooks(parseBooks || []);
            }
            getSearchBooks()
        }

        ,
        [searchTerm]
    )

    const bookCollection = []

    const [bookShelf, setBookShelf] = useState(bookCollection);

    function handleBookShelfChange(event, book) {

        const updateShelf = async () => {
            await update(book, event.target.value)

            const res = await getAll();

            let allBookRes

            if (res === undefined || 'error' in res) {
                allBookRes = []
            } else {
                allBookRes = res
            }

            const allParseBooks = bookParser(allBookRes);
            setBookShelf(allParseBooks || []);
        }

        updateShelf();



    }

    function handleSearchterm(event) {
        const newSearchTerm = event.target.value
        console.log(newSearchTerm)
        setSearchTerm(newSearchTerm)
    }

    return (
        <Routes>
            <Route exact
                   path="/"
                   element={<AllBookList bookCollection={bookShelf}
                                         onShelfChange={handleBookShelfChange}/>}
            />
            <Route exact
                   path="/search"
                   element={<Search searchBooksCollection={searchBooks}
                                    onShelfChange={handleBookShelfChange}
                                    onChangeTerm={handleSearchterm}
                   />}
            />
        </Routes>
    );
}

export default App;
