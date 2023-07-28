import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import TableComp from "../../components/Table/TableComp";
import { fetchGetAllEmployee } from "../../api/api";

function Employee({ setActiveBtn }) {
  setActiveBtn(2);

  useEffect( ()=>{
     getAllEmployee();
  },[])

  const [employees, setEmployees] = useState();

  const getAllEmployee = async () => {
    await fetchGetAllEmployee().then((res) => {
      setEmployees(res);
    }).catch(err=>console.log(err));
  };

  return (
    <Container style={{ marginTop: 6 + "em" }}>
      <Row className="mt-5 d-flex justify-content-center align-items-center">
        <TableComp employees={employees} />
      </Row>
    </Container>
  );
}

export default Employee;
