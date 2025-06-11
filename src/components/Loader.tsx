import React from "react";
import { Spin } from "antd";

const Loader: React.FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Spin size="large" style={{ margin: "20px auto", display: "block" }} />
    </div>
  );
};

export default Loader;
