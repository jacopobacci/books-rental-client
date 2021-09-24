import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

export default function ErrorNotification({ error }) {
  //   const [show, setShow] = useState(true);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setShow(false);
  //     }, 5000);
  //     return () => {
  //       clearTimeout(timer);
  //       setShow(true);
  //     };
  //   }, []);

  return (
    <>
      {error && (
        <Alert className="position-absolute" variant="danger">
          {error}
        </Alert>
      )}
    </>
  );
}
