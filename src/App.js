import {React} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './containers/Home';
import Login from './containers/Login';
import DashboardLayout from './containers/Layout';

import { logout } from './actions/userActions'
import BaseRouter from "./routes";

function App(props) {
  const isAuthenticated = false;
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
	<div className="App">
		<Router>
			{ userInfo ? 
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
