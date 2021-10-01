import { Container, Row } from "react-bootstrap";
import Book from "../../components/Books/Book";
import Search from "../../components/Books/Search";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import Link from "next/link";
import { useState, useEffect } from "react";

const index = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [rentalsData, setRentalsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books`);
      setBooksData(await res.json());
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/rentals`);
      setRentalsData(await res.json());
    };
    fetchData();
  }, []);

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
