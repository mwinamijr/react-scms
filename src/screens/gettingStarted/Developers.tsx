import React from "react";
import { Link } from "react-router-dom";

const Developers: React.FC = () => {
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      Developers getting started
    </div>
  );
};

export default Developers;
