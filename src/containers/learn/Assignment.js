import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listAssignments } from './../../actions/assignmentsActions';

function Assignment() {

  const dispatch = useDispatch()

  const assignmentList = useSelector(state => state.assignmentList)
  const { loading, error, assignments } = assignmentList

  console.log(assignments)

  useEffect(() => {
    dispatch(listAssignments())
    
}, [dispatch,])

    return (
        <div>
            Assignment
        </div>
    )
}

export default Assignment
