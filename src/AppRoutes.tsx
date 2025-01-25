// AppRoutes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reports from "./components/Reports/Reports";
import Dashboard from "./components/Dashboard/Dashboard";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/reports/:folderId" element={<Reports />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
