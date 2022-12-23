import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { UserAddOutlined, MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: `'Navigation Three - Submenu'`,
    key: 'SubMenu',
    icon: <UserAddOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
    ],
  },
];
const TopHead = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default TopHead;