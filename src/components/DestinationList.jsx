import React from 'react';
import { deleteData } from '../services/api';
import '../styles/DestinationList.css';

function DestinationList({ destinations, isOwner = false, setDestinations, onEdit }) {
  // Function to handle deleting a destination
  const handleDelete = async (id) => {
    // Confirm with the user before deleting
    const confirm = window.confirm('Are you sure you want to delete this destination?');
    if (!confirm) return;  // If the user cancels, exit the function

    try {
      // Send DELETE request to the server to delete the destination
      await deleteData(`/api/destinations/${id}`);

      // Filter out the deleted destination from the list of destinations
      const updated = destinations.filter(d => d._id !== id);

      // Update the state with the remaining destinations
      setDestinations(updated);
    } catch (err) {
      // If an error occurs, throw up an error
      alert('Failed to delete destination.');
    }
  };

  return (
    <div className="destination-list">
      {/* Looping through the destinations array and display each destination */}
      {destinations.map(dest => (
        <div className="destination-card" key={dest._id}>
          <h3>{dest.name}</h3>
          <p><strong>Location:</strong> {dest.location}</p>
          
          {/* Only display description if it exists */}
          {dest.description && <p>{dest.description}</p>}
          
          {/* Display tags if they exist */}
          {dest.tags?.length > 0 && (
            <p><strong>Tags:</strong> {dest.tags.join(', ')}</p>
          )}

          {/* Display the priority of the destination, default to 'Planned' if not available */}
          <p><strong>Priority:</strong> {dest.priority || 'Planned'}</p>
          
          {/* If there is an image URL, display the image; otherwise, display a message */}
          {dest.imageUrl ? (
            <img src={dest.imageUrl} alt={`View of ${dest.name}`} />
          ) : (
            <p><em>No image available.</em></p>
          )}

          {/* If the user is the owner, allow delete and edit actions */}
          {isOwner && (
            <div className="card-actions">
              {/* Button to delete the destination */}
              <button onClick={() => handleDelete(dest._id)}>Delete</button>
              
              {/* Button to edit the destination, if an edit handler function is provided */}
              {onEdit && (
                <button onClick={() => onEdit(dest)}>Edit</button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DestinationList;
