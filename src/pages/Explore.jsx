import React, { useEffect, useState } from 'react';
import DestinationList from '../components/DestinationList';
import { getData } from '../services/api';
import '../styles/Explore.css';

function Explore() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        // Fetch all destinations (public and private)
        const data = await getData('/api/destinations/public');
        setDestinations(data);  // Set all destinations in the state
        setLoading(false);
      } catch (err) {
        console.error('Failed to load destinations');
      }
    }

    fetchDestinations();  // Fetch data on component mount
  }, []);

  return (
    <div className="explore-background">
      <div className="explore-container">
        <h2>Explore Trips</h2>
        {loading ? <p>Loading...</p> : <DestinationList destinations={destinations} />}
      </div>
    </div>
  );
}

export default Explore;
