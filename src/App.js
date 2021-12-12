import {React} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './containers/Home';
import Login from './containers/Login';

import DashboardLayout from './containers/Layout';

import BaseRouter from "./routes";

function App(props) {
  const isAuthenticated = true;

  return (
	<div className="App">
		<Router>
			{ isAuthenticated ? 
				<DashboardLayout> 
					<BaseRouter />
				</DashboardLayout>
			:
			<Routes>
				<Route path="/" element={<Home /> } />
        <Route path="/login/" element={<Login />} />
			</Routes>
			}
			
		</Router>
	</div>
	
  );
}

export default App;
