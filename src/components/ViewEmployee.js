import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  AppBar,
  Toolbar
} from '@mui/material';
import { getEmployeeById } from '../services/api';

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeById(id);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
        alert('Failed to load employee details');
        navigate('/employees');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  if (loading) {
    return (
      <Container>
        <Box sx={{ mt: 4, textAlign: 'center' }}>Loading...</Box>
      </Container>
    );
  }

  if (!employee) {
    return (
      <Container>
        <Box sx={{ mt: 4, textAlign: 'center' }}>Employee not found</Box>
      </Container>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employee Management App
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            View Employee Details
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1">
              Employee First Name: {employee.firstName}
            </Typography>
            <Typography variant="body1">
              Employee Last Name: {employee.lastName}
            </Typography>
            <Typography variant="body1">
              Employee Email: {employee.email}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default ViewEmployee;
