import React, { useEffect, useState } from 'react';
import { getProtectedData } from '../services/api';
import DestinationList from '../components/DestinationList';
import DestinationForm from '../components/DestinationForm';
import '../styles/MyTrips.css';

function MyTrips() {
  const [destinations, setDestinations] = useState([]);
  const [selectedDest, setSelectedDest] = useState(null);

  useEffect(() => {
    async function fetchMyTrips() {
      try {
        const myTrips = await getProtectedData('/api/destinations');
        setDestinations(myTrips);
      } catch (err) {
        console.log('Failed to fetch user trips');
      }
    }

    fetchMyTrips();
  }, []);

  function addToList(newDest) {
    setDestinations([...destinations, newDest]);
  }

  function updateTrip(updated) {
    const updatedList = destinations.map(dest =>
      dest._id === updated._id ? updated : dest
    );
    setDestinations(updatedList);
  }

  return (
    <div className="page-container">
      <h2>My Trips</h2>
      <DestinationForm
        onAdd={addToList}
        onUpdate={updateTrip}
        selectedDest={selectedDest}
        clearSelected={() => setSelectedDest(null)}
      />
      <DestinationList
        destinations={destinations}
        isOwner={true}
        setDestinations={setDestinations}
        setSelectedDest={setSelectedDest}
      />
    </div>
  );
}

export default MyTrips;
