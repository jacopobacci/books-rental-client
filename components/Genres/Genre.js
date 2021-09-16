import React from "react";
import Update from "./Update";
import { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";

const Genre = ({ genre }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [genreName, setGenreName] = useState(genre.name);

  return (
    <ListGroup.Item key={genre.name}>
      {genreName}
      <Button variant="danger" className="float-end mx-2">
        Delete
      </Button>
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
