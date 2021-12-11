import {React} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardLayout from './containers/Layout';
import Dashboard from './containers/Dashboard'
import Login from './containers/Login'

import BaseRouter from "./routes";

function App(props) {
  return (
	<div className="App">
		<Router>
		<DashboardLayout> 
			<BaseRouter />
		</DashboardLayout>
		</Router>
	</div>
	
  );
}

export default App;
