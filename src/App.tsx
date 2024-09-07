// App.tsx
import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar'; // Import the Sidebar component
import Header from './Header'; // Import the Header component

const { Content, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider width={300} style={{ background: '#001529' }}>
        <Sidebar />
      </Sider>

      {/* Main Layout */}
      <Layout>
        <Header /> {/* Include the Header with 3-dots menu */}

        <Content style={{ margin: '16px', padding: '24px', background: '#fff', borderRadius: '8px' }}>
          <p>Input the draft text!</p>
          <textarea
            rows={10}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              borderColor: '#d9d9d9',
            }}
            placeholder="Enter the document text here..."
          />
          <button
            style={{
              marginTop: '16px',
              width: '100%',
              padding: '10px',
              backgroundColor: '#001529',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Run
          </button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
