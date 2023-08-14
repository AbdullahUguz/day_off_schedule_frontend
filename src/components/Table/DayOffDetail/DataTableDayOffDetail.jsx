import React from 'react'
import DataTable from 'react-data-table-component'
import EditDayOffModal from '../../Modal/EditDayOff/EditDayOffModal'

function DataTableDayOff({daysOff,control,setControl}) {

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

  return daysOff ? (
    <>
      <div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'left' }}>
           <strong style={{marginRight:"5px"}}>Day Off :</strong>{daysOff.initialDayOff}
          </div>
          <div>
          <strong style={{marginRight:"5px"}}>Remaining Day Off :</strong> {daysOff.remainingDayOff}
          </div>
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <EditDayOffModal></EditDayOffModal>
          </div>
          <DataTable
            columns={columns}
            data={daysOff.dayOffDetailList}
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
