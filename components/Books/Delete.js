import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";

const Delete = ({ setShowDeleteModal, book, setShowBook }) => {
  const auth = useContext(AuthContext);

  const deleteBook = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books/${book._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    setShowDeleteModal(false);
    setShowBook(false);
  };

  const handleClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete book</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="primary" onClick={deleteBook}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Delete;
