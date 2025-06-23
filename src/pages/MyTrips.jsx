import React, { useEffect, useState } from 'react';
import { getProtectedData } from '../services/api';
import DestinationList from '../components/DestinationList';
import DestinationForm from '../components/DestinationForm';
import '../styles/MyTrips.css';

function MyTrips() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    async function fetchMyTrips() {
      try {
        const all = await getProtectedData('/api/destinations');
        const myTrips = all.filter(dest => dest.user); // optionally compare with current user ID
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

  return (
    <div className="page-container">
      <h2>My Trips</h2>
      <DestinationForm onAdd={addToList} />
      <DestinationList destinations={destinations} isOwner={true} setDestinations={setDestinations} />
    </div>
  );
}

export default MyTrips;
