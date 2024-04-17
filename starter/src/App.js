import "./App.css";
import { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { Route, Routes } from "react-router-dom";
import MyReads from "./MyReads";
import SearchBook from "./SearchBook";
import * as BooksApi from "./BooksAPI";

function App() {
  const [listBooks, setListBooks] = useState([]);
  const [listShelf, setListShelf] = useState({});
  const [query, setQuery] = useState("");
  const [listBookSearch, setListBookSearch] = useState([]);

  useEffect(() => {
    const getAllBook = async () => {
      const listBooks = await BooksApi.getAll();
      setListBooks(listBooks);
    };
    getAllBook();
  }, []);

  useEffect(() => {
    const categories = _.uniqBy(listBooks, "shelf")?.map((book) => book?.shelf);
    const listShelfTemp = categories?.reduce(
      (a, v) => ({ ...a, [v]: listBooks?.filter((book) => book?.shelf === v) }),
      {}
    );

    setListShelf(listShelfTemp);
  }, [listBooks]);

  useEffect(() => {
    const search = async () => {
      const listBookSearchTemp = await BooksApi.search(query);
      if (listBookSearchTemp?.length > 0) {
        setListBookSearch(listBookSearchTemp);
      } else setListBookSearch([]);
    };
    if (query) search();
  }, [query]);

  const handleUpdateBook = useCallback((book, shelf) => {
    const updateBook = async () => {
      await BooksApi.update(book, shelf);
      setListShelf((e) => ({
        ...e,
        [`${shelf}`]: e?.[`${shelf}`].concat([{ ...book, shelf: shelf }]),
        [`${book?.shelf}`]: e?.[`${book?.shelf}`]?.filter((b) => b?.id !== book?.id),
      }));
    };
    updateBook();
  }, []);

  console.log("listCategories", listShelf);
  console.log("listBooks", listBooks);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<MyReads listShelf={listShelf} handleUpdateBook={handleUpdateBook} />}
      />
      <Route
        path="/search"
        element={
          <SearchBook
            listBookSearch={listBookSearch}
            query={query}
            setQuery={setQuery}
            handleUpdateBook={handleUpdateBook}
            listBooks={listBooks}
          />
        }
      />
    </Routes>
  );
}

export default App;
