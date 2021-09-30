import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { Container, Row } from "react-bootstrap";
import Customer from "../components/Customers/Customer";
import { AuthContext } from "../shared/context/auth-context";
import { useContext } from "react";
import Rental from "../components/Rentals/Rental";

export async function getServerSideProps() {
  const [customersRes, rentalsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/customers`),
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/rentals`),
  ]);
  const [customersData, rentalsData] = await Promise.all([customersRes.json(), rentalsRes.json()]);
  return { props: { customersData, rentalsData } };
}

const me = ({ customersData, rentalsData }) => {
  const auth = useContext(AuthContext);

  return (
    <div>
      <NavigationBar />
      <Container className="min-vh-100">
        <h1 className="mb-5 text-center">My profile</h1>
        <Row className="mb-3 justify-content-center">
          {!customersData.error ? (
            customersData.customers.map((customer) => {
              if (customer.user._id === auth.userId) return <Customer key={customer._id} customer={customer} />;
            })
          ) : (
            <p className="text-center">{customersData.error}</p>
          )}
          {!rentalsData.error ? (
            rentalsData.rentals.map((rental) => {
              if (rental.customer.user._id === auth.userId) return <Rental key={rental._id} rental={rental} />;
            })
          ) : (
            <p className="text-center">{rentalsData.error}</p>
          )}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default me;
