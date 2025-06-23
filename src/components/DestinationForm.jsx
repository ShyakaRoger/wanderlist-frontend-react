import React, { useState, useEffect } from 'react';
import { postData, putData } from '../services/api';
import '../styles/DestinationForm.css';

function DestinationForm({ onAdd, onUpdate, selectedDest, clearSelected }) {
  // Initialize form state with default values
  const [form, setForm] = useState({
    name: '',
    location: '',
    description: '',
    tags: '',
    imageUrl: '',
    priority: 'Planned'  // Default priority is 'Planned'
  });

  // State to handle errors
  const [error, setError] = useState('');

  // useEffect hook to populate the form with data when editing an existing destination
  useEffect(() => {
    // If there is a selected destination, update the form with its data
    if (selectedDest) {
      setForm({
        ...selectedDest,  // Copy existing destination data
        tags: selectedDest.tags.join(', '),  // Convert tags array to a comma-separated string
        priority: selectedDest.priority || 'Planned'  // Default to 'Planned' if no priority
      });
    }
  }, [selectedDest]);  // This effect runs whenever selectedDest changes

  // Handle input changes and update form state
  const handleChange = (evt) => {
    const { name, value } = evt.target;  // Extract the input name and value
    setForm({ ...form, [name]: value });  // Update the specific field in the form state
  };

  // Handle form submission to either add a new destination or update an existing one
  const handleSubmit = async (evt) => {
    evt.preventDefault();  // Prevent default form submission behavior
    setError('');  // Reset any previous errors

    // Prepare the form data, ensuring tags are an array (split by commas)
    const data = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim())  // Convert comma-separated tags into an array
    };

    try {
      // If editing an existing destination, update it on the server
      if (selectedDest) {
        const updated = await putData(`/api/destinations/${selectedDest._id}`, data);  // Send PUT request to update
        onUpdate(updated);  // Call the onUpdate function to update the parent component
        clearSelected();  // Clear the selected destination after updating
      } else {
        // If adding a new destination, send a POST request
        const newDest = await postData('/api/destinations', data);  // Send POST request to add new destination
        onAdd(newDest);  // Call the onAdd function to add the new destination to the parent component
      }

      // Reset the form after successful submission
      setForm({
        name: '',
        location: '',
        description: '',
        tags: '',
        imageUrl: '',
        priority: 'Planned'  // Reset to default priority
      });
    } catch (err) {
      // Handle errors if the request fails
      setError('Failed to save destination');  // Display error message
    }
  };

  return (
    <form className="destination-form" onSubmit={handleSubmit}>
      {/* Display title based on whether we're adding or editing a destination */}
      <h3>{selectedDest ? 'Edit Trip' : 'Add a New Trip'}</h3>

      {/* Show error message if there is an error */}
      {error && <p className="form-error">{error}</p>}

      {/* Input for the destination name */}
      <input
        name="name"
        placeholder="Destination Name"
        value={form.name}
        onChange={handleChange}
        required  // Ensure this field is filled out before submitting
      />
      
      {/* Input for the location */}
      <input
        name="location"
        placeholder="Enter a Location"
        value={form.location}
        onChange={handleChange}
        required  // Ensure this field is filled out before submitting
      />
      
      {/* Textarea for the description */}
      <textarea
        name="description"
        placeholder="Add Description"
        value={form.description}
        onChange={handleChange}
      />
      
      {/* Input for tags, which are comma-separated */}
      <input
        name="tags"
        placeholder="Add Tags"
        value={form.tags}
        onChange={handleChange}
      />
      
      {/* Input for the image URL */}
      <input
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
      />

      {/* Dropdown for selecting the priority of the destination */}
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="Planned">Planned</option>
        <option value="Visited">Visited</option>
      </select>

      {/* Submit button */}
      <button type="submit">{selectedDest ? 'Update' : 'Add Destination'}</button>
      
      {/* If editing, show a cancel button to clear selection */}
      {selectedDest && <button type="button" onClick={clearSelected}>Cancel</button>}
    </form>
  );
}

export default DestinationForm;
