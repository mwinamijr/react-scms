import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Avatar,
  Badge,
  Dropdown,
  Typography,
  Select,
  Button,
  Space,
} from "antd";
import type { MenuProps } from "antd";
import { BellOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Option } = Select;

const statusOptions = [
  { value: "all", label: "All Notification" },
  { value: "new", label: "New" },
  { value: "unread", label: "Unread" },
  { value: "other", label: "Other" },
] as const;

type StatusValue = (typeof statusOptions)[number]["value"];

const NotificationSection: React.FC = () => {
  const [value, setValue] = useState<StatusValue>("all");

  const menuItems: MenuProps["items"] = [
    {
      key: "header",
      label: (
        <Space>
          <Text strong>All Notifications</Text>
          <Badge count={1} />
        </Space>
      ),
    },
    {
      key: "markAll",
      label: <Link to="#">Mark all as read</Link>,
    },
    {
      key: "divider1",
      type: "divider",
    },
    {
      key: "filter",
      label: (
        <Select
          value={value}
          onChange={(val: StatusValue) => setValue(val)}
          style={{ width: "100%" }}
          size="small"
        >
          {statusOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      key: "divider2",
      type: "divider",
    },
    {
      key: "viewAll",
      label: (
        <Button type="link" block>
          View All
        </Button>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Badge count={1} offset={[-5, 5]}>
        <Avatar
          shape="square"
          icon={<BellOutlined />}
          style={{
            cursor: "pointer",
            backgroundColor: "#f56a00",
          }}
        />
      </Badge>
    </Dropdown>
  );
};

export default NotificationSection;
