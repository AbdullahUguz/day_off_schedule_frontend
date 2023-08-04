import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import EditDayOffModal from "../Modal/EditDayOffModal";
import FilterComponent from "./FilterComponent";
import { Button } from "react-bootstrap";
import EditEmployeeModal from "../Modal/EditEmployeeModal";
import { fetchDeleteEmployee } from "../../api/api";
import Swal from 'sweetalert2';


function DataTableComp({ employees, control, setControl }) {

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "130px",
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      width: "130px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Department",
      selector: (row) => row.department,
      width: "140px",

    },
    {
      name: "Day Off",
      center: true,
      width: "130px",
      selector: (row) => row.dayOff,
    },
    {
      name: "Remaining Day Off",
      center: true,
      width: "140px",

      selector: (row) => row.remainingDayOff,
    },
    {
      name: "Edit Day Off",
      allowOverflow: true,
      center: true,
      width: "100px",
      cell: (row) => {
        return (
          <>
            <EditDayOffModal control={control} setControl={setControl} employee={row} />
          </>
        );
      },
    },
    {
      name: "Employee Update",
      center: true,
      width: "130px",
      cell: (row) => {
        return (
          <>
            <EditEmployeeModal control={control} setControl={setControl} employee={row} />
          </>
        );
      },
    },
    {
      name: "Employee Delete",
      cell: (row) =>

        <Button variant="danger" onClick={async () => {

          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
              await fetchDeleteEmployee({
                employeeId: row.id
              }).then(res => {
                console.log(res);
                setControl(!control);
              }).catch(err => {
                Swal.fire({
                  icon: 'error',
                  title: 'There is a problem',
                  showConfirmButton: false,
                  timer: 1100
                })
                console.log("delete: ", err)
              })
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
          
        }}>Delete</Button>
      ,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

  ];

  const filteredItems = employees ? employees.filter(
    item => item.name && item.name?.toLowerCase().includes(filterText?.toLowerCase())
  ) : [];

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div>
      {employees ? (
        <>
          <DataTable
            columns={columns}
            data={filteredItems}
            fixedHeader
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
            highlightOnHover
          ></DataTable>
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default DataTableComp;
