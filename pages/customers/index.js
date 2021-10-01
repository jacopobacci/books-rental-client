import { Container, Row } from "react-bootstrap";
import Customer from "../../components/Customers/Customer.js";
import Footer from "../../components/Footer.js";
import NavigationBar from "../../components/NavigationBar";
import { useState, useEffect } from "react";

const index = () => {
  const [customersData, setCustomersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/customers`);
      setCustomersData(await res.json());
    };
    fetchData();
  }, []);

  return (
    <>
      <NavigationBar />
      <Container className="min-vh-100">
        <h1 className="mb-5 text-center">Customers</h1>
        <Row className="justify-content-center mb-3">
          {customersData.customers && !customersData.error ? (
            customersData.customers.map((customer) => <Customer key={customer._id} customer={customer} />)
          ) : (
            <p className="text-center">{customersData.error}</p>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default index;
