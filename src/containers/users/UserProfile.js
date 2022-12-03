import React from 'react'
import { Link } from 'react-router-dom'

function UserProfile() {
  return (
    <div>
      UserProfile
      <Link to="/users/" className='btn btn-light my-3'>Go Back</Link>
    </div>
  )
}

export default UserProfile