import {React} from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import DashboardLayout from './containers/Layout';

import BaseRouter from "./routes";

function App(props) {
  return (
	<div className="App">
		<Router>
		<DashboardLayout {...props}> 
			<BaseRouter />
		</DashboardLayout>
		</Router>
	</div>
	
  );
}

export default App;
