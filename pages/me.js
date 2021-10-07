import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { Container, Row, Spinner } from "react-bootstrap";
import Customer from "../components/Customers/Customer";
import { AuthContext } from "../shared/context/auth-context";
import { useContext } from "react";
import Rental from "../components/Rentals/Rental";
import { useEffect, useState } from "react";

const me = () => {
  const auth = useContext(AuthContext);
  const [customersData, setCustomersData] = useState([]);
  const [rentalsData, setRentalsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const resRentals = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/rentals`);
      const resCustomers = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/customers`);
      setRentalsData(await resRentals.json());
      setCustomersData(await resCustomers.json());
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavigationBar />
      <Container className="min-vh-100">
        <h1 className="mb-5 text-center">My profile</h1>
        <Row className="mb-3 justify-content-center">
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>
              {customersData.customers && !customersData.error ? (
                customersData.customers.map((customer) => {
                  if (customer.user._id === auth.userId) return <Customer key={customer._id} customer={customer} />;
                })
              ) : (
                <p className="text-center">{customersData.error}</p>
              )}
              {rentalsData.rentals && !rentalsData.error ? (
                rentalsData.rentals.map((rental) => {
                  if (rental.customer.user._id === auth.userId) return <Rental key={rental._id} rental={rental} />;
                })
              ) : (
                <p className="text-center">{rentalsData.error}</p>
              )}
            </>
          )}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default me;
