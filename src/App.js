import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import ViewEmployee from './components/ViewEmployee';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/employees"
                element={
                  <PrivateRoute>
                    <EmployeeList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employees/add"
                element={
                  <PrivateRoute>
                    <AddEmployee />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employees/view/:id"
                element={
                  <PrivateRoute>
                    <ViewEmployee />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employees/update/:id"
                element={
                  <PrivateRoute>
                    <UpdateEmployee />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/employees" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

