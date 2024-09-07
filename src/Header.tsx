// Header.tsx
import React from 'react';
import { Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const Header: React.FC = () => {
  const menu = (
    <Menu
      items={[
        { key: '1', label: 'Rerun' },
        { key: '2', label: 'Settings' },
        { key: '3', label: 'Print' },
        { key: '4', label: 'Record a screencast' },
        {key: '5', label:'About'}
      ]}
    />
  );

  return (
    <header style={{ padding: '0 16px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
      <h1 style={{ margin: 0 }}>Legal Document Revision AI-Agent</h1>
      
      {/* 3-dots dropdown menu */}
      <Dropdown overlay={menu} trigger={['click']}>
        <EllipsisOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
      </Dropdown>
    </header>
  );
};

export default Header;
