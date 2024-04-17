import { Link } from "react-router-dom";
import Shelf from "./Shelf";
import PropTypes from "prop-types";

const MyReads = ({ listShelf, handleUpdateBook }) => {
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {listShelf?.currentlyReading && (
              <Shelf
                shelf={listShelf?.currentlyReading}
                bookshelfTitle={"Currently Reading"}
                handleUpdateBook={handleUpdateBook}
              />
            )}
            {listShelf?.wantToRead && (
              <Shelf
                shelf={listShelf?.wantToRead}
                bookshelfTitle={"Want to Read"}
                handleUpdateBook={handleUpdateBook}
              />
            )}
            {listShelf?.read && (
              <Shelf
                shelf={listShelf?.read}
                bookshelfTitle={"Read"}
                handleUpdateBook={handleUpdateBook}
              />
            )}
          </div>
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};

MyReads.propTypes = {
  listShelf: PropTypes.object.isRequired,
  handleUpdateBook: PropTypes.func.isRequired,
};

export default MyReads;
