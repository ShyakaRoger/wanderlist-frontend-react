import React, { useEffect, useState } from 'react';
import { getProtectedData } from '../services/api';  // Import function to fetch protected data
import DestinationList from '../components/DestinationList';  // Import component to display list of destinations
import DestinationForm from '../components/DestinationForm';  // Import form component to add/update destinations
import '../styles/MyTrips.css';  // Import CSS for styling the page

function MyTrips() {
  // State to store all destinations for the current user
  const [destinations, setDestinations] = useState([]);
  
  // State to store the selected destination (for editing purposes)
  const [selectedDest, setSelectedDest] = useState(null);

  // Fetch user's destinations once the component mounts
  useEffect(() => {
    // Function to fetch destinations from the protected API endpoint
    async function fetchMyTrips() {
      try {
        const all = await getProtectedData('/api/destinations');  // Fetch data from the protected endpoint
        setDestinations(all);  // Set the fetched destinations in the state
      } catch (err) {
        console.log('Failed to fetch user trips');  // Log error if the fetch fails
      }
    }

    fetchMyTrips();  // Call the fetch function
  }, []);  // Empty dependency array ensures this runs only once after the component mounts

  // Function to add a new destination to the list
  const addToList = (newDest) => {
    setDestinations([...destinations, newDest]);  // Add the new destination to the state
  };

  // Function to update an existing destination in the list
  const updateInList = (updatedDest) => {
    // Map through the destinations and replace the updated destination
    const updatedList = destinations.map(dest =>
      dest._id === updatedDest._id ? updatedDest : dest
    );
    setDestinations(updatedList);  // Update the destinations state with the modified list
  };

  // Function to clear the selected destination (reset editing state)
  const clearSelected = () => setSelectedDest(null);

  // Function to handle editing a destination
  const handleEdit = (dest) => {
    setSelectedDest(dest);  // Set the selected destination for editing
    window.scrollTo({ top: 0, behavior: 'smooth' });  // Scroll to the top of the page for better UX
  };

  return (
    <div className="page-container">
      <h2>My Trips</h2>
      {/* Pass necessary props to the DestinationForm for adding or updating destinations */}
      <DestinationForm
        onAdd={addToList}  // Function to add a new destination
        onUpdate={updateInList}  // Function to update an existing destination
        selectedDest={selectedDest}  // Pass the selected destination to pre-fill the form for editing
        clearSelected={clearSelected}  // Function to clear selected destination (cancel editing)
      />
      
      {/* Display the list of destinations with options to edit or delete */}
      <DestinationList
        destinations={destinations}  // Pass the list of destinations to be displayed
        isOwner={true}  // Indicate that the user is the owner of the destinations
        setDestinations={setDestinations}  // Allow modifying the destinations list directly
        onEdit={handleEdit}  // Function to handle editing a destination
      />
    </div>
  );
}

export default MyTrips;
