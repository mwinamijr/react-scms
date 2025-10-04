import React from "react";
import { Link } from "react-router-dom";

const Teachers: React.FC = () => {
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      Teachers getting started
    </div>
  );
};

export default Teachers;
