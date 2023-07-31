import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ModalComp from "../Modal/ModalComp";
import { fetchGetAllEmployee } from "../../api/api";

function DataTableComp({employees,control,setControl}) {

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Department",
      selector: (row) => row.department,
    },
    {
      name: "Day Off",
      selector: (row) => row.dayOff,
    },
    {
      name: "Remaining Day Off",
      selector: (row) => row.remainingDayOff,
    },
    {
      name: "Edit Day Off",
      allowOverflow: true,
      cell: (row) => {
        return (
          <>
            <ModalComp control={control} setControl={setControl} employee={row} />
          </>
        );
      },
    },
  ];

  return (
    <div>
      {employees ? (
        <>
          <DataTable
            columns={columns}
            data={employees}
            fixedHeader
            pagination
          ></DataTable>
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default DataTableComp;
