import React from 'react'
import DataTable from 'react-data-table-component'
import EditDayOffModal from '../../Modal/EditDayOff/EditDayOffModal'

function DataTableDayOff({daysOff,control,setControl}) {
  const columns = [
    {
      name: "Id",
      selector: (row) => row.dayOffDetailList.id,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.dayOffDetailList.id,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.dayOffDetailList.id,
      sortable: true,
    },
    {
      name: "Used Day Off",
      selector: (row) => row.dayOffDetailList.id,
      sortable: true,
    },
    {
      name: "Explanation",
      selector: (row) => row.dayOffDetailList.explanation,
      sortable: true,
    },
  ]

  return (
    <>
      <div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'left' }}>
           Day Off : 
          </div>
          <div>
           Remaining Day Off :
          </div>
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <EditDayOffModal></EditDayOffModal>
          </div>
          <DataTable
            columns={columns}
            data={daysOff}
            fixedHeader
            pagination
            highlightOnHover
          />
        </div>
      </div>

    </>
  )
}

export default DataTableDayOff
