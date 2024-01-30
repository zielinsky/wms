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
import { Outlet, useNavigate } from 'react-router';
import { SelectEventHandler } from 'rc-menu/lib/interface';
import { useAuth } from '../../Hooks/useAuth';

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

const keyToPathMap : {[key: string] : string}= {
  'wms': "",
  'users': "/users",
  'logsPut': "/logs?filter=put",
  'logsTake': "/logs?filter=take",
  'logsAll': "/logs?filter=all",
  'admin': '/admin',
}


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const auth = useAuth()

  const onSelectMenu : SelectEventHandler= ({key, ...rest}) => {
    navigate(keyToPathMap[key])
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{background: colorBgContainer, fontSize: 30, borderRadius: 8, margin: "10px 20px 20px 20px" }}>
          Warehouse Management System
        </Header>
      <Layout>
        <Sider style={{borderRadius:"0px 8px 0px"}}theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="justify-between flex h-full flex-col pb-3 pt-20">
            <Menu style={{borderInlineEnd: 0, borderRadius: 8}}theme="light" defaultSelectedKeys={['wms']} mode="inline" items={items} onSelect={onSelectMenu}/>
            <Button type='text' size='large' onClick={auth.logout} >
              <LogoutOutlined style={{fontSize: 20}} />
            </Button>
          </div>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
              Weppo @ {new Date().getFullYear()} Created by Patryk Zieliński & Jan Buszka
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HomePage;