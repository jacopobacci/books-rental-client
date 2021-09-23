import Link from "next/link";
import { useContext, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { AuthContext } from "../../shared/context/auth-context";
import Delete from "./Delete";

const BookButtons = ({ book, setShowBook, setBookAvailable, setDateOut }) => {
  const auth = useContext(AuthContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [disabled, setDisabled] = useState(!book.isAvailable);

  function formattedDate(d) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${day}/${month}/${year}`;
  }

  const createRental = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/rentals`, {
      body: JSON.stringify({
        book: book._id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      method: "POST",
    });
    const result = await res.json();
    setDateOut(formattedDate(new Date(result.rental.dateOut)));
    setDisabled(true);
    setBookAvailable(false);
  };

  return (
    <>
      <div className="mx-3">
        <div className="d-grid gap-2">
          <Button variant="success" onClick={createRental} disabled={disabled && true}>
            Rent
          </Button>
        </div>
      </div>
      <ButtonGroup aria-label="Update and delete" className="m-3">
        <Link
          href={{
            pathname: "/books/[bookId]",
            query: { bookId: book._id },
          }}
        >
          <Button variant="primary">Update</Button>
        </Link>
        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
          Delete
        </Button>
        {showDeleteModal && <Delete setShowDeleteModal={setShowDeleteModal} book={book} setShowBook={setShowBook} />}
      </ButtonGroup>
    </>
  );
};

export default BookButtons;
