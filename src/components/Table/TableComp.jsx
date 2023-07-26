import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ModalComp from "../Modal/ModalComp";

function TableComp() {
  const data = [
    {
      id: 1,
      name: "ali",
      lastName: "aa",
      email: "aa@gmail.com",
      department: "software",
      dayOff: 20,
      reamainingDayOff: 5,
    },
    {
      id: 1,
      name: "sefa",
      lastName: "aa",
      email: "aa@gmail.com",
      department: "software",
      dayOff: 20,
      reamainingDayOff: 5,
    },
    {
      id: 1,
      name: "kemal",
      lastName: "aa",
      email: "aa@gmail.com",
      department: "software",
      dayOff: 20,
      reamainingDayOff: 5,
    },
    {
      id: 1,
      name: "ece",
      lastName: "aa",
      email: "aa@gmail.com",
      department: "software",
      dayOff: 20,
      reamainingDayOff: 5,
    },
    {
      id: 1,
      name: "elif",
      lastName: "aa",
      email: "aa@gmail.com",
      department: "software",
      dayOff: 20,
      reamainingDayOff: 5,
    },
    {
      id: 1,
      name: "ahmet",
      lastName: "aa",
      email: "aa@gmail.com",
      department: "software",
      dayOff: 20,
      reamainingDayOff: 5,
    },
    {
      id: 1,
      name: "lale",
      lastName: "aa",
      email: "aa@gmail.com",
      department: "software",
      dayOff: 20,
      reamainingDayOff: 5,
    },
  ];

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
          {data.map((employee) => (
            <tr>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.dayOff}</td>
              <td>{employee.reamainingDayOff}</td>
              <td>
                <ModalComp employee={employee} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TableComp;
