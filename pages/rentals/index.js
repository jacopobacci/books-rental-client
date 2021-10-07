import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import Rental from "../../components/Rentals/Rental";
import { useState, useEffect } from "react";

const index = () => {
  const [rentalsData, setRentalsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/rentals`);
      setRentalsData(await res.json());
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <NavigationBar />
      <Container className="min-vh-100">
        <h1 className="mb-5 text-center">Rentals</h1>
        <Row className="justify-content-center">
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>
              {rentalsData.rentals && !rentalsData.error ? (
                rentalsData.rentals.map((rental) => <Rental key={rental._id} rental={rental} />)
              ) : (
                <p className="text-center">{rentalsData.error}</p>
              )}
            </>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default index;
