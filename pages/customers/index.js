import { Container, Row, Spinner } from "react-bootstrap";
import Customer from "../../components/Customers/Customer.js";
import Footer from "../../components/Footer.js";
import NavigationBar from "../../components/NavigationBar";
import { useState, useEffect } from "react";

const index = () => {
  const [customersData, setCustomersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/customers`);
      setCustomersData(await res.json());
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <NavigationBar />
      <Container className="min-vh-100">
        <h1 className="mb-5 text-center">Customers</h1>
        <Row className="justify-content-center mb-3">
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>
              {customersData.customers && !customersData.error ? (
                customersData.customers.map((customer) => <Customer key={customer._id} customer={customer} />)
              ) : (
                <p className="text-center">{customersData.error}</p>
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
