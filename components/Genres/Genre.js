import React, { useContext, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";
import Delete from "./Delete";
import Update from "./Update";

const Genre = ({ genre }) => {
  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;

  const [showUpdate, setShowUpdate] = useState(false);
  const [genreName, setGenreName] = useState(genre.name);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showGenre, setShowGenre] = useState(true);

  return (
    <ListGroup.Item key={genre.name} className={`${!showGenre && "d-none"}`}>
      {genreName}
      {isLoggedIn && genre.user === auth.userId && (
        <>
          <Button variant="danger" className="float-end mx-1" onClick={() => setShowDeleteModal(true)} size="sm">
            Delete
          </Button>
          {showDeleteModal && <Delete setShowDeleteModal={setShowDeleteModal} genre={genre} setShowGenre={setShowGenre} />}
          <Button
            variant="primary"
            className="float-end mx-1"
            onClick={() => (!showUpdate ? setShowUpdate(true) : setShowUpdate(false))}
            size="sm"
          >
            Update
          </Button>
          {showUpdate && (
            <div className="p-4">
              <Update genre={genre} setShowUpdate={setShowUpdate} setGenreName={setGenreName} />
            </div>
          )}
        </>
      )}
    </ListGroup.Item>
  );
};

export default Genre;
