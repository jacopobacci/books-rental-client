import React from "react";
import { Container, Row } from "react-bootstrap";
import Rental from "../../components/Rentals/Rental";
import NavigationBar from "../../components/NavigationBar";

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/rentals`);
  const rentalsData = await res.json();
  return {
    props: { rentalsData },
  };
}

const index = ({ rentalsData }) => {
  console.log(rentalsData);

  return (
    <>
      <NavigationBar />
      <Container>
        <Row className="justify-content-center">
          {!rentalsData.message ? (
            rentalsData.rentals.map((rental) => <Rental key={rental._id} rental={rental} />)
          ) : (
            <p>{rentalsData.message}</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default index;
