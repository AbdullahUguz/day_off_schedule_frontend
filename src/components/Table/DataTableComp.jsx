import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import ModalComp from "../Modal/ModalComp";
import FilterComponent from "./FilterComponent";

function DataTableComp({ employees, control, setControl }) {

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] =useState(false);

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

  const filteredItems = employees ? employees.filter(
    item => item.name && item.name?.toLowerCase().includes(filterText?.toLowerCase())
  ): [];

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
          ></DataTable>
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default DataTableComp;
