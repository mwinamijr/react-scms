import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'

import Dashboard from './containers/Dashboard';
import Assignment from './containers/learn/Assignment';
import Payments from './containers/finance/Payments';
import Receipts from './containers/finance/Receipts';
import Reports from './containers/finance/Reports';
import Teachers from './containers/Teachers';
import StudentList from './containers/students/StudentList';
import StudentDetailsScreen from './containers/students/StudentDetails';
import AddStudent from './containers/students/AddStudent';
import AddReceipt from './containers/finance/AddReceipt';


const BaseRouter = () => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
	return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        <Route path='receipts/'>
          <Route path="" element={<Receipts />} />
          <Route path="add/" element={<AddReceipt />} />
          <Route path="payments/" element={<Payments />} />
          <Route path="reports/" element={<Reports />} />
        </Route>
        
        <Route path="sis/" >
          <Route path="students/" element={<StudentList />} />
          <Route path="students/:id" element={<StudentDetailsScreen />} />
          <Route path="students/add" element={<AddStudent />} />
        </Route>
        
        <Route path="/teachers/" element={<Teachers />} />
        <Route path="/learn/assignments/" element={<Assignment />} />
      </Routes>
    </div>
		)
}

export default BaseRouter;