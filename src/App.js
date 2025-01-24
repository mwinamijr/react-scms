import React from "react";
import { useSelector } from "react-redux";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import DashboardLayout from "./screens/NewLayout";

import BaseRouter from "./routes";
import Parents from "./screens/gettingStarted/Parents";
import Developers from "./screens/gettingStarted/Developers";
import Teachers from "./screens/gettingStarted/Teachers";

function App() {
  // Access userInfo from the user slice
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div className="App">
      <Router>
        {userInfo ? (
          <div>
            <DashboardLayout>
              <BaseRouter />
            </DashboardLayout>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/" element={<Login />} />
            <Route
              path="/getting-started/developers/"
              element={<Developers />}
            />
            <Route path="/getting-started/teachers/" element={<Teachers />} />
            <Route path="/getting-started/parents/" element={<Parents />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
