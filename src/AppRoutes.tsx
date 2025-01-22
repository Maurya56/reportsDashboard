// AppRoutes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reports/:folderId" element={<Reports />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;