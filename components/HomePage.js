import Image from "next/image";

import { Row, Col } from "react-bootstrap";

const HomePage = () => {
  return (
    <div className="bg-white d-inline rounded">
      <h1 className="text-center pt-5">Rent a book, share your thoughts.</h1>
      <Row className="justify-content-center">
        <Col lg={6}>
          <Image src="/books-rental.png" width={780} height={600} alt="Books Rental Home" />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
