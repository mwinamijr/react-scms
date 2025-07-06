import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Typography, Space, message } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import User1 from "../../assets/user-round.svg";
import { logout } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const { Text } = Typography;

const ProfileSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state) => state.getUsers);

  const handleLogout = () => {
    dispatch(logout());
    message.success("Logged out successfully!");
    navigate("/login");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <Text>
          {getGreeting()}, {userInfo?.email}
        </Text>
      ),
    },
    {
      key: "role",
      label: <Text type="secondary">Project Admin</Text>,
    },
    {
      key: "divider1",
      type: "divider",
    },
    {
      key: "settings",
      label: (
        <Space>
          <SettingOutlined /> Account Settings
        </Space>
      ),
    },
    {
      key: "social",
      label: (
        <Space>
          <UserOutlined /> Social Profile
          <BellOutlined style={{ marginLeft: 10 }} />
        </Space>
      ),
    },
    {
      key: "logout",
      label: (
        <Space onClick={handleLogout} style={{ cursor: "pointer" }}>
          <LogoutOutlined /> Logout
        </Space>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Avatar
        src={User1}
        size="large"
        style={{ cursor: "pointer", border: "2px solid #1890ff" }}
      />
    </Dropdown>
  );
};

export default ProfileSection;
