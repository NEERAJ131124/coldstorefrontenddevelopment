import React, { useState } from "react";
import AuthHeader from "../../../Layout/AuthHeader/Index";
import Footer from "../../../Layout/Footer";
import { Container } from "reactstrap";

const TestComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {

  };

  return (
    <>
      <AuthHeader />
      <div className="page-body" style={{ minHeight: "550px" }}>
        <Container>
          <h1 className="my-3">Test</h1>
          <button onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default TestComponent;
