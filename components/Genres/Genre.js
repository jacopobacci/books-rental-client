import React from "react";
import Update from "./Update";
import { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import Delete from "./Delete";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext } from "react";

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
          <Button variant="danger" className="float-end mx-2" onClick={() => setShowDeleteModal(true)}>
            Delete
          </Button>
          {showDeleteModal && <Delete setShowDeleteModal={setShowDeleteModal} genre={genre} setShowGenre={setShowGenre} />}
          <Button
            variant="primary"
            className="float-end mx-2"
            onClick={() => (!showUpdate ? setShowUpdate(true) : setShowUpdate(false))}
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
