import { useMemo } from "react";
import PropTypes from "prop-types";

const Book = (props) => {
  const { title, authors, imageLinks, shelf, id } = props?.book;
  const { handleUpdateBook, listBooks } = props;

  const currentShelf = useMemo(() => {
    return listBooks?.find((b) => b?.id === id)?.shelf;
  }, [listBooks, id]);

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: imageLinks?.thumbnail ? `url(${imageLinks?.thumbnail})` : null,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={shelf || currentShelf || "none"}
              onChange={(e) => {
                handleUpdateBook(props?.book, e.target.value);
              }}
            >
              <option value="none" disabled>
                {currentShelf || shelf ? "Move to..." : "Add to..."}
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              {currentShelf || (shelf && <option value="none">None</option>)}
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors?.join(", ")}</div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  listBooks: PropTypes.array.isRequired,
  handleUpdateBook: PropTypes.func.isRequired,
};

export default Book;
