import React, { useEffect, useState } from 'react';
import DestinationList from '../components/DestinationList';
import { getProtectedData } from '../services/api';
import { useAuth } from '../context/AuthContext'; // Importing the authentication context
import '../styles/Home.css';

function Home() {
  // Access the user from the AuthContext to check if the user is logged in
  const { user } = useAuth();

  // State for holding the destinations data and loading state
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect hook that runs when the component mounts or when the user state changes
  useEffect(() => {
    // If there is no user or no token in localStorage, skip fetching data
    if (!user || !localStorage.getItem('token')) return;

    // Define an asynchronous function to fetch destinations data
    async function fetchAllDestinations() {
      try {
        // Fetch data from a protected route that requires authentication
        const data = await getProtectedData('/api/destinations');
        
        // Set the destinations data in state once fetched
        setDestinations(data);
        
        // Set loading to false once data is fetched
        setLoading(false);
      } catch (err) {
        // Handle error if the request fails
        console.log('Error loading destinations');
      }
    }

    // Call the fetch function to load destinations
    fetchAllDestinations();
  }, [user]);  // This effect depends on the user state (runs again when user changes)

  // If the user is not logged in, show the scenic hero section
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

  // If the user is logged in, show the destinations list
  return (
    <div className="page-container">
      <h2>All Destinations</h2>
      {<DestinationList destinations={destinations} />}
    </div>
  );
}

export default Home;
