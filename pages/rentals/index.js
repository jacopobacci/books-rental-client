import React from "react";
import { Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer";
import NavigationBar from "../../components/NavigationBar";
import Rental from "../../components/Rentals/Rental";
import { useState, useEffect } from "react";

const index = () => {
  const [rentalsData, setRentalsData] = useState([]);

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
        <h1 className="mb-5 text-center">Rentals</h1>
        <Row className="justify-content-center">
          {rentalsData.rentals && !rentalsData.error ? (
            rentalsData.rentals.map((rental) => <Rental key={rental._id} rental={rental} />)
          ) : (
            <p className="text-center">{rentalsData.error}</p>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default index;
