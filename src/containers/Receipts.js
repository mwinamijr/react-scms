import React from 'react'
import { Breadcrumb } from 'react-bootstrap';


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
        Receipts
        
        </div>

      </div>
    )
}

export default Receipts
