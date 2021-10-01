import Link from "next/link";
import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import Footer from "../../components/Footer";
import Genre from "../../components/Genres/Genre";
import NavigationBar from "../../components/NavigationBar";

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/genres`);
  const data = await res.json();

  return {
    props: { data },
  };
}

const index = ({ data }) => {
  return (
    <>
      <NavigationBar />
      <Container className="min-vh-100">
        <h1 className="mb-5 text-center">All genres</h1>
        <Row className="justify-content-center">
          <Col xs lg={6}>
            {data.error ? (
              <>
                <p className="text-center">There aren't still genres...</p>
                <p className="text-center">
                  <Link href="/genres/create">Create a genre</Link>
                </p>
              </>
            ) : (
              <ListGroup className="border-0">
                {data.genres && data.genres.map((genre) => <Genre key={genre._id} genre={genre} />)}
                <ListGroup.Item>
                  <Link href="/genres/create">Add new genre</Link>
                </ListGroup.Item>
              </ListGroup>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default index;
