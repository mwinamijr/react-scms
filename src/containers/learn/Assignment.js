import { List } from 'antd/lib/form/Form';
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { listAssignments } from '../../redux/actions/assignmentsActions';

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
      {loading ? <Loader /> :
          error ? <Message>{error}</Message>:
          (
          <div>
            <List
              header={<div>Assignments</div>}
              bordered
              dataSource={assignments}
              renderItem={item => <List.Item>{item}</List.Item> }
            
            />
          </div>
      )}
    </div>
  )
}

export default Assignment
