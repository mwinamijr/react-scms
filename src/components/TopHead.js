import React, { useState } from 'react';
import { useSelector} from 'react-redux'
import { UserAddOutlined, MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const TopHead = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={
    [
      {
        label: 'Notifications',
        key: 'mail',
        icon: <MailOutlined />,
      },
      {
        label: `${userInfo.first_name} ${userInfo.last_name}`,
        key: 'SubMenu',
        icon: <UserAddOutlined />,
        children: [
          {
            type: 'group',
            children: [
              {
                label: 'User Profile',
                key: 'setting:1',
              },
              {
                label: 'logout',
                key: 'setting:2',
              },
            ],
          },
        ],
      },
    ]
  } />;
};
export default TopHead;