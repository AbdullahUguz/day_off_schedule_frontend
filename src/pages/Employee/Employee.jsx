import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import TableComp from "../../components/Table/TableComp";
import { fetchGetAllEmployee } from "../../api/api";
import DataTableEmployee from "../../components/Table/EmployeeDataTable/DataTableEmployee";

function Employee({ setActiveBtn }) {
  setActiveBtn(2);
  const [control, setControl] = useState(false);
  const [employees, setEmployees] = useState();

  useEffect( ()=>{
     getAllEmployee();
  },[control])


  const getAllEmployee = async () => {
    await fetchGetAllEmployee().then((res) => {
      setEmployees(res);
      console.log("employee res :",res)
    }).catch(err=>console.log(err));
  };

  return (
    <Container style={{ marginTop: 6 + "em" }}>
      <Row className="mt-5 d-flex justify-content-center align-items-center">
        {/* <TableComp employees={employees} control={control} setControl={setControl} /> */}

        <DataTableEmployee employees={employees} control={control} setControl={setControl}/>
      </Row>
    </Container>
  );
}

export default Employee;
