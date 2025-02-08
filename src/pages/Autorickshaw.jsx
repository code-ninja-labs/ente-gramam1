import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Supabase client setup

const Autorickshaw = () => {
  const [drivers, setDrivers] = useState([]); // State to hold the driver list
  const [loading, setLoading] = useState(true); // State for the loading indicator

  // Fetch data from Supabase on component mount
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const { data, error } = await supabase
          .from('autorickshaw-drivers')
          .select('name, phone'); // Fetch name and phone only
  
        if (error) throw error; // Handle errors
        setDrivers(data); // Save fetched data to state
      } catch (err) {
        console.error('Error fetching drivers', err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Autorickshaw Details</h1>
      <p>Below are the autorickshaw driver details:</p>

      {/* Show loading state */}
      {loading ? (
        <p>Loading drivers...</p>
      ) : drivers?.length > 0 ? (
        // Render the drivers table if data is available
        <table border="1" style={{ margin: '0 auto', width: '80%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={index}>
                <td>{driver.name}</td>
                <td>{driver.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Show this message if no drivers exist
        <p>No driver data available.</p>
      )}
    </div>
  );
};

export default Autorickshaw;
