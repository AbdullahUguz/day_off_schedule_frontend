import React from 'react'
import DataTable from 'react-data-table-component'
import EditDayOffModal from '../../Modal/EditDayOff/EditDayOffModal'

function DataTableDayOff({ dayOff, control, setControl }) {

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.endDate,
      sortable: true,
    },
    {
      name: "Used Day Off",
      selector: (row) => row.usedDayOff,
      sortable: true,
      center: true,
    },
    {
      name: "Explanation",
      selector: (row) => row.explanation,
      sortable: true,
    },
  ]

  return dayOff ? (
    <>
      <div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'left' }}>
            <strong style={{ marginRight: "5px" }}>Day Off :</strong>{dayOff.initialDayOff}
          </div>
          <div>
            <strong style={{ marginRight: "5px" }}>Remaining Day Off :</strong> {dayOff.remainingDayOff}
          </div>
          <div>
            <EditDayOffModal dayOff={dayOff} control={control} setControl={setControl}></EditDayOffModal>
          </div>
          <DataTable
            columns={columns}
            data={dayOff.dayOffDetailList}
            fixedHeader
            pagination
            highlightOnHover
          />
        </div>
      </div>

    </>
  ) : (<>
    loading...
  </>)
}

export default DataTableDayOff
