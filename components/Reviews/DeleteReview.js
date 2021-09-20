import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext } from "react";

const Delete = ({ setShowDeleteModal, review, setDeletedReview }) => {
  const auth = useContext(AuthContext);

  const deleteReview = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/reviews/${review._id}`, {
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
  };

  const handleClose = () => {
    setShowDeleteModal(false);
    setDeletedReview(true);
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete review</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="primary" onClick={deleteReview}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Delete;
