import {React} from 'react';
import { useSelector } from 'react-redux'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './containers/Home';
import Login from './containers/Login';
import DashboardLayout from './containers/Layout';

// import { logout } from './actions/userActions'
import BaseRouter from "./routes";
import Parents from './containers/gettingStarted/Parents';
import Developers from './containers/gettingStarted/Developers';
import Teachers from './containers/gettingStarted/Teachers';

function App() {
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
        <Route path="/getting-started/developers/" element={<Developers />} />
        <Route path="/getting-started/teachers/" element={<Teachers />} />
        <Route path="/getting-started/parents/" element={<Parents />} />
			</Routes>
			}
			
		</Router>
	</div>
	
  );
}

export default App;
