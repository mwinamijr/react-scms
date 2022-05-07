import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Table } from 'react-bootstrap';

function Receipts() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">
            Library
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
      <div>
      <div>
        <div>
          <h1 className="text-center">Receipts</h1>
          <Link to="/receipts/add" className='btn btn-light my-3'>Add Receipt</Link>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Receipt No</th>
                <th>Allocation</th>
                <th>Paid for</th>
                <th>Amonunt</th>
                <th>Received by</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Username</th>
              </tr>
            </thead>
          </Table>
            
        </div>
      </div>
      </div>
      </div>
    )
}

export default Receipts
