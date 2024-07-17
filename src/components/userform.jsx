import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';

const UserForm = ({ open, onClose, onSave, editingUser }) => {
  const [user, setUser] = useState({
    userName: '',
    userEmail: '',
    password: '',
    role: '',
    profile_name: '',
    profile_bio: '',
    profile_contact_phone: '',
    image: '',
  });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({
        userName: '',
        userEmail: '',
        password: '',
        role: '',
        profile_name: '',
        profile_bio: '',
        profile_contact_phone: '',
        image: '',
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(user);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editingUser ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent>
        <TextField
          label="User Name"
          name="userName"
          value={user.userName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="User Email"
          name="userEmail"
          value={user.userEmail}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Role"
          name="role"
          value={user.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Profile Name"
          name="profile_name"
          value={user.profile_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Profile Bio"
          name="profile_bio"
          value={user.profile_bio}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contact Phone"
          name="profile_contact_phone"
          value={user.profile_contact_phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URL"
          name="image"
          value={user.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UserForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    editingUser: PropTypes.shape({
      userName: PropTypes.string,
      userEmail: PropTypes.string,
      password: PropTypes.string,
      role: PropTypes.string,
      profile_name: PropTypes.string,
      profile_bio: PropTypes.string,
      profile_contact_phone: PropTypes.string,
      image: PropTypes.string,
    }),
  };

  UserForm.defaultProps = {
    editingUser: null,
  };
export default UserForm;
