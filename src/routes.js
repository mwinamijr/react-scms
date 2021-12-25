import React from 'react';
import { Routes, Route } from "react-router-dom";

import Dashboard from './containers/Dashboard';
import Assignment from './containers/learn/Assignment';
import Payments from './containers/Payments';
import Receipts from './containers/Receipts';
import Reports from './containers/Reports';
import Teachers from './containers/Teachers';


const BaseRouter = () => {
	return (
    <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/receipts/" element={<Receipts />} />
          <Route path="/payments/" element={<Payments />} />
          <Route path="/reports/" element={<Reports />} />
          <Route path="/teachers/" element={<Teachers />} />
          <Route path="/learn/assignments/" element={<Assignment />} />
        </Routes>
    </div>
		)
}

export default BaseRouter;