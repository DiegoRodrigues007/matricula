import React from 'react';
import Sidebar from '../components/menuLateral/Sidebar';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default MainLayout;
