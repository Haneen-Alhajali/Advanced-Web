import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Overview from '../pages/Overview';
import VillageManagement from '../pages/VillageManagement';
import Chat from '../pages/chatSystem/Chat';
import Gallery from '../pages/Gallery';
import styles from '../assets/css/dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      {/* Sidebar is always visible */}
      <Sidebar />
      <main className={styles.mainContent}>
        <Routes>
          {/* Use 'dashboard/' as the path prefix for all routes */}
          <Route path="overview" element={<Overview />} />
          <Route path="village-management" element={<VillageManagement />} />
          <Route path="chat" element={<Chat />} />
          <Route path="gallery" element={<Gallery />} />
          {/* Redirect to '/dashboard/overview' if no route matches */}
          <Route path="*" element={<Navigate to="overview" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
