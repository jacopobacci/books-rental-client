import { Container, Row } from "react-bootstrap";
import Customer from "../../components/Customers/Customer.js";
import Footer from "../../components/Footer.js";
import NavigationBar from "../../components/NavigationBar";

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/customers`);
  const customersData = await res.json();

  return {
    props: { customersData },
  };
}

const index = ({ customersData }) => {
  return (
    <>
      <NavigationBar />
      <Container className="min-vh-100">
        <h1 className="mb-5 text-center">Customers</h1>
        <Row className="justify-content-center mb-3">
          {!customersData.error ? (
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
