import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import UserForm from './UserForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:3001/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://localhost:3001/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter((user) => user._id !== id));
      toast.success('User deleted successfully!');
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleSave = async (user) => {
    if (editingUser) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.put(`http://localhost:3001/users/${editingUser._id}`, user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(users.map((u) => (u._id === editingUser._id ? response.data : u)));
        toast.success('User updated successfully!');
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      }
    } else {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.post('http://localhost:3001/users', user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers([...users, response.data]);
        toast.success('User added successfully!');
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      }
    }

    handleClose();
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add User
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Profile Name</TableCell>
              <TableCell>Profile Bio</TableCell>
              <TableCell>Contact Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.userEmail}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.profile_name}</TableCell>
                <TableCell>{user.profile_bio}</TableCell>
                <TableCell>{user.profile_contact_phone}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(user._id)} style={{ marginLeft: '1rem' }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserForm open={open} onClose={handleClose} onSave={handleSave} editingUser={editingUser} />
    </Container>
  );
};

export default Users;
