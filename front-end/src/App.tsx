import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from '../src/layout/MainLayout';
import AnimatedRoutes from '../src/router/AppRoutes';
import './styles/slide.css'; 

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <AnimatedRoutes />
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
