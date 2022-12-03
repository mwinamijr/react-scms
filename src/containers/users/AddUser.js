import React from 'react'
import { Link } from 'react-router-dom'

function AddUser() {
  return (
    <div>
      <Link to="/users/" className='btn btn-light my-3'>Go Back</Link>
      AddUser
    </div>
  )
}

export default AddUser