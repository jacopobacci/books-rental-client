import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext } from "react";
import { useRouter } from "next/router";

const DeleteReview = ({ setShowDeleteModal, review }) => {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const deleteReview = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/reviews/${review._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        method: "DELETE",
      });
      setShowDeleteModal(false);
      router.push("/books");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShowDeleteModal(false);
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

export default DeleteReview;
