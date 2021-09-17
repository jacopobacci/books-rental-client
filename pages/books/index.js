import React from "react";
import { Container, Row } from "react-bootstrap";
import Book from "../../components/Books/Book";
import NavigationBar from "../../components/NavigationBar";

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books`);
  const data = await res.json();

  if (!data) {
    return {
      redirect: {
        destination: "/notfound",
        permanent: false,
      },
    };
  }

  return {
    props: { data },
  };
}

const index = ({ data }) => {
  return (
    <>
      <NavigationBar />
      <Container>
        <Row className="justify-content-center">
          {data.books.map((book) => (
            <Book key={book._id} book={book} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default index;
