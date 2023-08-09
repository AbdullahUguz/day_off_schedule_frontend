import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import DataTableDepartment from '../../components/Table/DepartmentDataTable/DataTableDepartment';
import { fetchGetAllDepartment } from '../../api/api';

function Department({ setActiveBtn }) {
    setActiveBtn(3);
    const [control, setControl] = useState(false);
    const [deparments, setDepartments] = useState();
  
    useEffect( ()=>{
      getAllDepartment();
    },[control])
  
  
    const getAllDepartment = async () => {
      await fetchGetAllDepartment().then((res) => {
        setDepartments(res);
      }).catch(err=>console.log(err));
    };
  
  return (
    <Container style={{ marginTop: 6 + "em" }}>
      <Row className="mt-5 d-flex justify-content-center align-items-center">
        <DataTableDepartment departments={deparments} control={control} setControl={setControl} />
      </Row>
    </Container>
  )
}

export default Department
