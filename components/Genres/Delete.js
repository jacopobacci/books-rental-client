import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext } from "react";

const Delete = ({ setShowDeleteModal, genre, setShowGenre }) => {
  const auth = useContext(AuthContext);

  const deleteGenre = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/genres/${genre._id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      method: "DELETE",
    });
    const result = await res.json();
    if (!result.error) {
      setShowDeleteModal(false);
      setShowGenre(false);
    } else {
      setShowDeleteModal(false);
      console.log(result.error);
    }
  };

  const handleClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete genre</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="primary" onClick={deleteGenre}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Delete;
