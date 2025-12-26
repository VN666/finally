import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RectificationList from './components/RectificationList';
import InspectionList from './components/InspectionList';
import DataDashboard from './components/DataDashboard';
import Records from './components/Records';
import { UserRole } from './types';

function App() {
  const [role, setRole] = useState<UserRole>(UserRole.STORE_MANAGER);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard role={role} setRole={setRole} />} />
          <Route path="/rectification" element={<RectificationList role={role} />} />
          <Route path="/inspection" element={<InspectionList />} />
          <Route path="/stats" element={<DataDashboard />} />
          <Route path="/records" element={<Records />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
