import React from "react";
import { Table } from "react-bootstrap";
import EditDayOffModal from "../Modal/EditDayOff/EditDayOffModal";

function TableComp({employees,control,setControl}) {

  return (
    <>
      <Table
        striped
        bordered
        hover
        style={{ borderRadius: "6px", overflow: "hidden" }}
      >
        <thead className="table-primary" style={{}}>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Day Off</th>
            <th>Remaining Day Off</th>
            <th>Edit Day Off</th>
          </tr>
        </thead>
        <tbody>
          {employees ? employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.dayOff}</td>
              <td>{employee.remainingDayOff}</td>
              <td>
                <EditDayOffModal control={control} setControl={setControl} employee={employee} />
              </td>
            </tr>
          )):<></>}
        </tbody>
      </Table>
    </>
  );
}

export default TableComp;
