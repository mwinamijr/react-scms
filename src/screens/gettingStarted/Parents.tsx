import React from "react";
import { Link } from "react-router-dom";

const Parents: React.FC = () => {
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      Parents getting started
    </div>
  );
};

export default Parents;
