import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  AppBar,
  Toolbar
} from '@mui/material';
import { getEmployeeById, updateEmployee } from '../services/api';

const UpdateEmployee = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeById(id);
        const emp = response.data;
        setFormData({
          firstName: emp.firstName,
          lastName: emp.lastName,
          email: emp.email
        });
      } catch (error) {
        console.error('Error fetching employee:', error);
        alert('Failed to load employee details');
        navigate('/employees');
      } finally {
        setFetching(false);
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      await updateEmployee(id, formData);
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Container>
        <Box sx={{ mt: 4, textAlign: 'center' }}>Loading...</Box>
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
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Update Employee
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email id"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
              <Button
                type="button"
                variant="contained"
                color="error"
                fullWidth
                onClick={() => navigate('/employees')}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default UpdateEmployee;
