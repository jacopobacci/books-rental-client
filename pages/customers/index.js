import { Container, Row } from "react-bootstrap";
import Customer from "../../components/Customers/Customer.js";
import NavigationBar from "../../components/NavigationBar";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/customers`);
  const data = await res.json();

  if (!data) {
    return {
      redirect: {
        destination: "/notfound",
        permanent: false,
      },
    };
  }

  return {
    props: { data },
  };
}

const index = ({ data }) => {
  const auth = useContext(AuthContext);
  const { isLoggedIn } = auth;

  return (
    <>
      <NavigationBar />
      <Container>
        <Row className="justify-content-center">
          {data.customers !== undefined ? (
            data.customers.map((customer) => <Customer key={customer._id} customer={customer} />)
          ) : (
            <p>No customers yet.</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default index;
