import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserAddOutlined, BellOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { logout } from "./../redux/actions/userActions";

const TopHead = () => {
  const dispatch = useDispatch();

  // Access userInfo from the user slice
  const { userInfo } = useSelector((state) => state.user);

  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const logoutHandler = () => {
    dispatch(logout());
    console.log("signed out");
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={[
        {
          label: "Notifications",
          key: "mail",
          icon: <BellOutlined />,
        },
        {
          label: `${userInfo.first_name} ${userInfo.last_name}`,
          key: "SubMenu",
          icon: <UserAddOutlined />,
          children: [
            {
              type: "group",
              children: [
                {
                  label: "User Profile",
                  key: "setting:1",
                },
                {
                  label: (
                    <Link onClick={logoutHandler} to="/">
                      Sign Out
                    </Link>
                  ),
                  key: "setting:2",
                },
              ],
            },
          ],
        },
      ]}
    />
  );
};
export default TopHead;
