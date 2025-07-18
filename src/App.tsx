import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import NetworkMap from './components/NetworkMap';
import Assets from './components/Assets';
import Clients from './components/Clients';
import Maintenance from './components/Maintenance';
import Reports from './components/Reports';
import Planning from './components/Planning';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'network':
        return <NetworkMap />;
      case 'assets':
        return <Assets />;
      case 'clients':
        return <Clients />;
      case 'maintenance':
        return <Maintenance />;
      case 'reports':
        return <Reports />;
      case 'planning':
        return <Planning />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
          {renderPage()}
        </Layout>
      </div>
    </LanguageProvider>
  );
}

export default App;