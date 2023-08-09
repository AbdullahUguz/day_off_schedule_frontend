import React from 'react'
import DataTable from 'react-data-table-component'
import AddDepartmentModal from '../../Modal/AddDepartment/AddDepartmentModal'

function DataTableDepartment({ departments, control, setControl }) {

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
    ]

    return (
        <>
            <div>
                <div>
                    <div  style={{ display: 'flex', justifyContent: 'right' }}>
                        <AddDepartmentModal control={control} setControl={setControl}/>
                    </div>
                    <DataTable
                        columns={columns}
                        data={departments}
                        fixedHeader
                        pagination
                        highlightOnHover
                    />
                </div>
            </div>

        </>
    )
}

export default DataTableDepartment
