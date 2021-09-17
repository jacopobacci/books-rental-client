import React from "react";
import { Container, Row } from "react-bootstrap";
import Book from "../../components/Books/Book";
import NavigationBar from "../../components/NavigationBar";

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books`);
  const booksData = await res.json();

  if (!booksData) {
    return {
      redirect: {
        destination: "/notfound",
        permanent: false,
      },
    };
  }

  return {
    props: { booksData },
  };
}

const index = ({ booksData }) => {
  return (
    <>
      <NavigationBar />
      <Container>
        <Row className="justify-content-center">
          {booksData.books.map((book) => (
            <Book key={book._id} book={book} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default index;
