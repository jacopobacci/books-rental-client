import React from "react";
import { Container, Row } from "react-bootstrap";
import Book from "../../components/Books/Book";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";

export async function getServerSideProps() {
  const [booksRes, rentalsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/books`),
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/rentals`),
  ]);
  const [booksData, rentalsData] = await Promise.all([booksRes.json(), rentalsRes.json()]);
  return { props: { booksData, rentalsData } };
}

const index = ({ booksData, rentalsData }) => {
  return (
    <>
      <NavigationBar />
      <Container className="min-vh-100">
        <h1 className="mb-5 text-center">All books</h1>
        <Row className="justify-content-center">
          {booksData.books.map((book) => (
            <Book key={book._id} book={book} rentalsData={rentalsData} />
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default index;
