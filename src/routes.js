import React from 'react';
import { Routes, Route } from "react-router-dom";

import Dashboard from './containers/Dashboard';
import Login from './containers/Login';


const BaseRouter = () => {
	return (
    <div>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/login/" element={<Login />} />
        </Routes>
    </div>
		)
}

export default BaseRouter;