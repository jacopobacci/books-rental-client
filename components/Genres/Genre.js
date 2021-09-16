import React from "react";
import Update from "./Update";
import { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import Delete from "./Delete";

const Genre = ({ genre }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [genreName, setGenreName] = useState(genre.name);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showGenre, setShowGenre] = useState(true);

  return (
    <ListGroup.Item key={genre.name} className={`${!showGenre && "d-none"}`}>
      {genreName}
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
    </ListGroup.Item>
  );
};

export default Genre;
