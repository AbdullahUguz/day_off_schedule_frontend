import React from "react";
import { Button, Table } from "react-bootstrap";

function TableComp() {
  return (
    <>
      <Table striped bordered hover style={{borderRadius: '6px', overflow: 'hidden'}}>
        <thead className="table-primary" style={{}}>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Day Off</th>
            <th>Remaining Day Off</th>
            <th>Edit Day Off</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>20</td>
            <td>5</td>
            <td>
              <Button variant="info">Edit</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>20</td>
            <td>5</td>
            <td>
              <Button variant="info">Edit</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>20</td>
            <td>5</td>
            <td>
              <Button variant="info">Edit</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>20</td>
            <td>5</td>
            <td>
              <Button variant="info">Edit</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>20</td>
            <td>5</td>
            <td>
              <Button variant="info">Edit</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>20</td>
            <td>5</td>
            <td>
              <Button variant="info">Edit</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>sadasdasdasdsadasdsa@fat</td>
            <td>20</td>
            <td>5</td>
            <td>
              <Button variant="info">Edit</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>20</td>
            <td>5</td>
            <td>
              <Button variant="info">Edit</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default TableComp;
