import { AuthContext } from "../../shared/context/auth-context";
import { useContext, useEffect, useState } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";

const Customer = ({ customer }) => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState({ user: { firstName: "", lastName: "", email: "" } });

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          method: "GET",
        });
        const result = await res.json();
        console.log(result);
        setUser(result);
      } catch (error) {
        console.log(error);
      }
    };
    getMe();
  }, []);

  console.log(customer.favouriteGenres);

  return (
    <Row className="justify-content-center">
      <Col lg={2}>
        <ListGroup>
          <ListGroup.Item variant="dark">
            {user.user.firstName} {user.user.lastName}
          </ListGroup.Item>
          <ListGroup.Item>{customer.city}</ListGroup.Item>
          <ListGroup.Item>{customer.street}</ListGroup.Item>
          <ListGroup.Item>{customer.streetNumber}</ListGroup.Item>
          <ListGroup.Item>{customer.postalCode}</ListGroup.Item>
          <ListGroup.Item>{customer.phone}</ListGroup.Item>
          <ListGroup.Item>
            <ul>
              {customer.favouriteGenres.map((genre) => (
                <li>{genre.name}</li>
              ))}
            </ul>
          </ListGroup.Item>
          {/* <ListGroup.Item>{customer.favouriteGenres}</ListGroup.Item> */}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default Customer;
