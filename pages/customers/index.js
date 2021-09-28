import { Container, Row } from "react-bootstrap";
import Customer from "../../components/Customers/Customer.js";
import NavigationBar from "../../components/NavigationBar";

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
  return (
    <>
      <NavigationBar />
      <Container>
        <h1 className="mb-5 text-center">Customers</h1>
        <Row className="justify-content-center mb-3">
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
