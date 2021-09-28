import Image from "next/image";

import { Row, Col } from "react-bootstrap";

const HomePage = () => {
  return (
    <>
      <div className="bg-white d-inline rounded">
        <Row className="justify-content-center align-items-center pt-5">
          <Col>
            <h1 className="text-center">Rent a book, share your thoughts.</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={6}>
            <Image src="/books-rental.png" width={780} height={600} alt="Books Rental Home" />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomePage;
