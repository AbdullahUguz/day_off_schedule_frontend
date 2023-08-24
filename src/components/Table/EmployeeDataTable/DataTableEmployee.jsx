import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import { Button } from "react-bootstrap";
import EditEmployeeModal from "../../Modal/EditEpmloyee/EditEmployeeModal";
import { fetchDeleteEmployee } from "../../../api/api";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";


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
      width: "150px",
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      width: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "150px",
    },
    {
      name: "Department",
      selector: (row) => row.department.name,
      width: "130px",

    },
    {
      name: "Day Off",
      center: true,
      width: "120px",
      selector: (row) => row.dayOff.initialDayOff,
    },
    {
      name: "Remaining Day Off",
      center: true,
      width: "150px",
      selector: (row) => row.dayOff.remainingDayOff,
    },
    {
      name: "Day Off Detail",
      cell: (row) =>
        <Link to={`daysOff/${row.id}`}>
          <Button variant="info"  >
            Day Off Detail
          </Button>
        </Link>
      ,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "130px",

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
                setControl(!control);
              }).catch(err => {
                Swal.fire({
                  icon: 'error',
                  title: 'There is a problem',
                  showConfirmButton: false,
                  timer: 1100
                })
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

    </div>
  );
}

export default DataTableComp;
