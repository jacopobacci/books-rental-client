import React from "react";
import { Container, ListGroup, Row, Col, Button } from "react-bootstrap";
import NavigationBar from "../../components/NavigationBar";
import { useState } from "react";
import Genre from "../../components/Genres/Genre";

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/genres`);
  const data = await res.json();

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}

const index = ({ data }) => {
  return (
    <>
      <NavigationBar />
      <Container>
        <Row className="justify-content-center">
          <Col xs lg={6}>
            <ListGroup>
              <ListGroup.Item as="li" active>
                Genres
              </ListGroup.Item>
              {data.genres.map((genre) => (
                <Genre key={genre._id} genre={genre} />
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default index;
