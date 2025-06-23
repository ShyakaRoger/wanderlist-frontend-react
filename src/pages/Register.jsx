import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Form.css';
import '../styles/AuthBackground.css'; 

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(evt) {
    evt.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.err || 'Registration failed');
        return;
      }

      login(data.user, data.token);
      navigate('/my-trips');
    } catch (err) {
      setError('Server error');
    }
  }

  function handleChange(evt) {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  }

  return (
    <div className="auth-background">
      <form className="auth-form-container" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="form-error">{error}</p>}
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
