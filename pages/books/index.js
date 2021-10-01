import { Container, Row } from "react-bootstrap";
import Book from "../../components/Books/Book";
import Search from "../../components/Books/Search";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import { useState } from "react";
import Link from "next/link";

export async function getServerSideProps() {
  const [booksRes, rentalsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/books`),
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/rentals`),
  ]);
  const [booksData, rentalsData] = await Promise.all([booksRes.json(), rentalsRes.json()]);
  return { props: { booksData, rentalsData } };
}

const index = ({ booksData, rentalsData }) => {
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults);
  return (
    <>
      <NavigationBar />
      <Container className="min-vh-100">
        <h1 className="mb-5 text-center">All books</h1>
        <Search setSearchResults={setSearchResults} />
        {searchResults.error || booksData.error ? (
          <>
            <p className="text-center">{searchResults.error || booksData.error}</p>
            {booksData.error && (
              <p className="text-center">
                <Link href="/books/create">Create a book</Link>
              </p>
            )}
          </>
        ) : searchResults.books ? (
          <Row className="justify-content-center">
            {searchResults.books &&
              searchResults.books.map((book) => <Book key={book._id} book={book} rentalsData={rentalsData} />)}
          </Row>
        ) : (
          <Row className="justify-content-center">
            {booksData.books && booksData.books.map((book) => <Book key={book._id} book={book} rentalsData={rentalsData} />)}
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default index;
