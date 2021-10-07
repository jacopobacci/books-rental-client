import { Container, Row, Spinner } from "react-bootstrap";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const resBooks = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books`);
      const resRentals = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/rentals`);
      setBooksData(await resBooks.json());
      setRentalsData(await resRentals.json());
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <NavigationBar />
      <Container className="min-vh-100">
        <h1 className="mb-5 text-center">All books</h1>
        <Search setSearchResults={setSearchResults} />
        {isLoading ? (
          <Row className="justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Row>
        ) : (
          <>
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
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default index;
