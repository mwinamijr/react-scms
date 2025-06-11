import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { MenuProps } from "antd";
import { UserAddOutlined, BellOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { logout } from "../features/user/userSlice";
import type { RootState } from "../store";

const TopHead: React.FC = () => {
  const dispatch = useDispatch();

  // Access userInfo from Redux state
  const { userInfo } = useSelector((state: RootState) => state.getUsers);

  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const logoutHandler = () => {
    dispatch(logout());
    console.log("signed out");
  };

  const items: MenuProps["items"] = [
    {
      label: "Notifications",
      key: "mail",
      icon: <BellOutlined />,
    },
    {
      label: `${userInfo?.first_name ?? ""} ${userInfo?.last_name ?? ""}`,
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
  ];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default TopHead;
