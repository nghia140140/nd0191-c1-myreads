import { Link } from "react-router-dom";
import Book from "./Book";
import PropTypes from "prop-types";

const SearchBook = ({ listBookSearch, query, setQuery, handleUpdateBook, listBooks }) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {listBookSearch &&
            listBookSearch?.map((book) => (
              <Book
                book={book}
                key={book?.id}
                handleUpdateBook={handleUpdateBook}
                listBooks={listBooks}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

SearchBook.propTypes = {
  listBookSearch: PropTypes.array,
  query: PropTypes.string,
  setQuery: PropTypes.string,
  handleUpdateBook: PropTypes.func.isRequired,
  listBooks: PropTypes.array,
};

export default SearchBook;
