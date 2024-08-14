'use client';

import React from 'react';
import styled from 'styled-components';
import DashboardSidebar from '@/app/Dash-Folder/Sidebar';
import Homepage from '@/app/Dash-Folder/Homepage';
import Footer from '../Dash-Folder/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  margin-left: 80px;
  background-color: #ffffff;
`;

const DashboardPage = () => {
  return (
    <Container>
      <DashboardSidebar />
      <MainContent>
        <Homepage />
      </MainContent>
      <Footer />
    </Container>
  );
};

export default DashboardPage;
