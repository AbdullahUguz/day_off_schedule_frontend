import React, { useEffect, useState } from 'react'
import DataTableDayOffDetail from '../../components/Table/DayOffDetail/DataTableDayOffDetail'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { fetchGetDayOffById } from '../../api/api';

function DayOffDetail({setActiveBtn}) {
    setActiveBtn(2);
    const [control, setControl] = useState(false);
    const [daysOff, setDaysOff] = useState();
    const { employeeId } = useParams();
  
    useEffect( ()=>{
        getDayOffById(employeeId);
    },[control])
  
  
    const getDayOffById = async (employeeId) => {
      await fetchGetDayOffById({employeeId:employeeId}).then((res) => {
        console.log("res : ",res);
        setDaysOff(res);
      }).catch(err=>console.log(err));
    };
  
    return (
        <div>
            <Container style={{ marginTop: 6 + "em" }}>
                <Row className="mt-5 d-flex justify-content-center align-items-center">
                    <DataTableDayOffDetail control={control} setControl={setControl} daysOff={daysOff} />
                </Row>
            </Container>
        </div>
    )
}

export default DayOffDetail
