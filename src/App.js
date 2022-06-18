import "./App.css";
import {Route, Routes} from "react-router-dom";
import Search from "./Search";
import AllBookList from "./AllBookList";
import {useEffect, useState} from "react";
import {getAll, search, update} from "./BooksAPI";


function App() {
    // const init = [{
    //     id: "ycTADgAAQBAJ",
    //     shelf: "currentlyReading",
    //     bookname: "Learnind React",
    //     author: "Alex Bank",
    //     style: {
    //         width: 128,
    //         height: 193,
    //         backgroundImage:
    //             'url("http://books.google.com/books/content?id=ycTADgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"")',
    //     }
    // },
    //     {
    //         id: "Rhl1CgAAQBAJ",
    //         shelf: "currentlyReading",
    //         bookname: "React.js Essentials",
    //         author: "Artemij Fedosejev",
    //         style: {
    //             width: 128,
    //             height: 188,
    //             backgroundImage:
    //                 'url("http://books.google.com/books/content?id=Rhl1CgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api")',
    //         }
    //     },
    //     ]

    const [searchBooks, setSearchBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [initialBooks, setInitialBooks] = useState([]);
    const [bookShelf, setBookShelf] = useState(initialBooks);

    function bookParser(apiBooks) {

        return apiBooks.map((book) => {

            return {
                shelf: book.shelf || "none",
                id: book.id,
                bookname: book.title,
                author: "authors" in book ? book.authors[0] : "",
                style: {
                    width: 128,
                    height: 190,
                    backgroundImage: "imageLinks" in book ? `url(${book.imageLinks.thumbnail}` : ''
                }
            };
        });
    }


    useEffect(() => {
        const initializeBooks = async () => {
            const books = [{id: "ycTADgAAQBAJ"},
                {id: "Rhl1CgAAQBAJ"}]
            books.forEach((book) => {
                update(book, 'currentlyReading')
            })

            const res = await getAll();
            const init = bookParser(res)
            setInitialBooks(init)
            setBookShelf(init)
        }
        initializeBooks()
    }, [])

    useEffect(() => {
            const getSearchBooks = async () => {
                if (!searchTerm) {
                    return
                }
                const res = await search(searchTerm);

                let searchList

                if (res === undefined || 'error' in res) {
                    searchList = []
                } else {
                    searchList = res
                }

                function updateSearchListShelf(listOfItems) {
                    let result = []

                    for (let i = 0; i < listOfItems.length; i++) {
                        let newItem = listOfItems[i]
                        for (let j = 0; j < bookShelf.length; j++) {
                            if (bookShelf[j].id === listOfItems[i].id) {
                                newItem = {
                                    ...listOfItems[i],
                                    shelf: bookShelf[j].shelf
                                }
                            }
                        }
                        result.push(newItem)
                    }
                    return result
                }

                const result = updateSearchListShelf(searchList)
                console.log(result)


                const parseBooks = bookParser(result);
                setSearchBooks(parseBooks || []);
            }
            getSearchBooks()
        }

        ,
        [searchTerm, bookShelf]
    )


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
