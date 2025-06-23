import React, { useEffect, useState } from 'react';
import DestinationList from '../components/DestinationList';
import { getProtectedData } from '../services/api';
import { useAuth } from '../context/AuthContext'; // ✅ added
import '../styles/Home.css';

function Home() {
  const { user } = useAuth(); // ✅ detect if logged in
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!user || !localStorage.getItem('token')) return; // ✅ skip if not logged in

  async function fetchAllDestinations() {
    try {
      const data = await getProtectedData('/api/destinations');
      setDestinations(data);
      setLoading(false);
    } catch (err) {
      console.log('Error loading destinations');
    }
  }

  fetchAllDestinations();
}, [user]);

  // ✅ Logged-out view: scenic hero section
  if (!user) {
    return (
      <div className="hero-image">
        <div className="hero-text">
          <h1>Welcome to Wanderlist</h1>
          <p>Explore the world. Discover new places. Share your adventures.</p>
        </div>
      </div>
    );
  }

  // ✅ Logged-in view: show destinations
  return (
    <div className="page-container">
      <h2>All Destinations</h2>
      {loading ? <p>Loading...</p> : <DestinationList destinations={destinations} />}
    </div>
  );
}

export default Home;
