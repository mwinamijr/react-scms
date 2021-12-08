import {React, Fragment} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BaseLayout from "./containers/BaseLayout";


import BaseRouter from "./routes";

function App() {
  return (
    
	<div className="App">
		<div className="container">
		<BaseLayout> 
			
			<BaseRouter />
		</BaseLayout>

		</div>
	</div>
	
  );
}

export default App;
