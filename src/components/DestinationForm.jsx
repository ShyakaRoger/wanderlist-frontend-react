import React, { useState, useEffect } from 'react';
import { postData, putData } from '../services/api';
import '../styles/DestinationForm.css';

function DestinationForm({ onAdd, onUpdate, selectedDest, clearSelected }) {
  const [form, setForm] = useState({
    name: '',
    location: '',
    description: '',
    tags: '',
    imageUrl: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedDest) {
      setForm({
        ...selectedDest,
        tags: selectedDest.tags.join(', ')
      });
    }
  }, [selectedDest]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError('');

    const data = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim())
    };

    try {
      if (selectedDest) {
        const updated = await putData(`/api/destinations/${selectedDest._id}`, data);
        onUpdate(updated);
        clearSelected();
      } else {
        const newDest = await postData('/api/destinations', data);
        onAdd(newDest);
      }

      setForm({
        name: '',
        location: '',
        description: '',
        tags: '',
        imageUrl: ''
      });
    } catch (err) {
      setError('Failed to save destination');
    }
  };

  return (
    <form className="destination-form" onSubmit={handleSubmit}>
      <h3>{selectedDest ? 'Edit Trip' : 'Add a New Trip'}</h3>
      {error && <p className="form-error">{error}</p>}

      <input
        name="name"
        placeholder="Destination Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
      />
      <input
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
      />

      <button type="submit">{selectedDest ? 'Update' : 'Add Destination'}</button>
      {selectedDest && <button type="button" onClick={clearSelected}>Cancel</button>}
    </form>
  );
}

export default DestinationForm;
