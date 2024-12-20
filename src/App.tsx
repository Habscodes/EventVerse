import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { config, queryClient } from './config/wagmi';
import { Navbar } from './components/Layout/Navbar';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { CreateEvent } from './pages/CreateEvent';

function App() {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/create" element={<CreateEvent />} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export default App;