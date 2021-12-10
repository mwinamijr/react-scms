import React from 'react';
import { Routes, Route } from "react-router-dom";

import Dashboard from './containers/Dashboard';
import Login from './containers/Login';


const BaseRouter = () => {
	return (
    <div>
        <Routes>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login/" component={Login} />
        </Routes>
    </div>
		)
}

export default BaseRouter;