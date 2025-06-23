import React, { useState } from 'react';
import { postData } from '../services/api';
import { useAuth } from '../context/AuthContext'; // ✅ added
import '../styles/DestinationForm.css';

function DestinationForm({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    location: '',
    description: '',
    public: false,
    tags: '',
    imageUrl: ''
  });

  const [error, setError] = useState('');
  const { user } = useAuth(); // ✅ get the logged-in user

  function handleChange(evt) {
    const { name, value, type, checked } = evt.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: fieldValue });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setError('');

    try {
      const data = {
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim()),
        user: user.id // ✅ properly added user ID to the payload
      };

      const newDest = await postData('/api/destinations', data);
      onAdd(newDest);

      setForm({
        name: '',
        location: '',
        description: '',
        public: false,
        tags: '',
        imageUrl: ''
      });
    } catch (err) {
      setError('Failed to add destination');
    }
  }

  return (
    <form className="destination-form" onSubmit={handleSubmit}>
      <h3>Add a New Trip</h3>
      {error && <p className="form-error">{error}</p>}

      <input
        name="name"
        placeholder="Enter Destination Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Add Location"
        value={form.location}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Add Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="tags"
        placeholder="Enter Tags"
        value={form.tags}
        onChange={handleChange}
      />
      <input
        name="imageUrl"
        placeholder="Enter image URL"
        value={form.imageUrl}
        onChange={handleChange}
      />

      <button type="submit">Add Destination</button>
    </form>
  );
}

export default DestinationForm;
