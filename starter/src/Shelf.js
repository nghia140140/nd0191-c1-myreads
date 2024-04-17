import Book from "./Book";
import PropTypes from "prop-types";

const Shelf = ({ shelf, bookshelfTitle, handleUpdateBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookshelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelf?.map((book) => (
            <Book book={book} key={book?.id} handleUpdateBook={handleUpdateBook} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  shelf: PropTypes.array.isRequired,
  bookshelfTitle: PropTypes.string.isRequired,
  handleUpdateBook: PropTypes.func.isRequired,
};

export default Shelf;
