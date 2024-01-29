import React, { useState } from 'react';
import {
  DesktopOutlined,
  TeamOutlined,
  InboxOutlined,
  HistoryOutlined,
  UserOutlined,
  LogoutOutlined,
  
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import { useAuth } from '../../Contexts/AuthContext';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Warehouses', 'wms', <InboxOutlined />),
  getItem('Users', 'users', <TeamOutlined />),
  getItem('Logs', 'logs', <HistoryOutlined />, [
    getItem('Put', 'logsPut'),
    getItem('Take', 'logsTake'),
    getItem('All', 'logsAll')
  ]),
  getItem('Admin', 'admin', <UserOutlined />),
];

const HomePage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const auth = useAuth()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="justify-between flex h-full flex-col pb-3 pt-20">
          <Menu style={{borderInlineEnd: 0}}theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
          <Button type='text' size='large' onClick={auth.logout} >
            <LogoutOutlined style={{fontSize: 20}} />
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header style={{background: colorBgContainer, fontSize: 30, textAlign: 'left' }}>
          Warehouse Management System
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Weppo @ {new Date().getFullYear()} Created by Patryk Zieliński & Jan Buszka
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomePage;