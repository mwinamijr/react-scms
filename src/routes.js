import React from 'react';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";

import Dashboard from './containers/Dashboard';
import ClassicFormPage from './containers/Register';


const BaseRouter = () => {
	return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login/" component={ClassicFormPage} />
        </Routes>
      </Router>
    </div>
		)
}

export default BaseRouter;