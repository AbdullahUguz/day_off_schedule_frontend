import React from "react";
import { Container, Row } from "react-bootstrap";
import TableComp from "../../components/Table/TableComp";

function Employee({ setActiveBtn }) {
  setActiveBtn(2);

  return (
    <Container style={{ marginTop: 6 + "em" }}>
      <Row className="mt-5 d-flex justify-content-center align-items-center">
        <TableComp />
      </Row>
    </Container>
  );
}

export default Employee;
