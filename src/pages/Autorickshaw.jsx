import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Ensure the Supabase client is imported correctly

const Autorickshaw = () => {
  const [drivers, setDrivers] = useState([]); // To store driver details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state to capture errors

  // Fetch driver data from Supabase
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true); // Start loading

        // Fetch data from the "autorickshaw-drivers" table
        const { data, error } = await supabase
          .from('autorickshaw-drivers') // Table name
          .select('name, phone'); // Columns to fetch

        if (error) {
          // Something went wrong with the query
          throw error;
        }

        if (!data.length) {
          // Handle case where no data is found
          setDrivers([]);
          setError('No drivers found in the database.');
        } else {
          // Successfully fetched data
          setDrivers(data);
          setError(null); // Clear any previous errors
        }
      } catch (err) {
        // Catch connection or query errors
        if (err.message.toLowerCase().includes('network')) {
          setError('Connection Error: Unable to connect to the database. Please check your internet connection.');
        } else {
          setError(`Error: ${err.message}`); // Show specific query errors
        }
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchDrivers(); // Call fetch function
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Autorickshaw Drivers</h1>
      <p>Find details about autorickshaw drivers available in your area:</p>
      
      {/* Show loading spinner while fetching */}
      {loading ? (
        <p>Loading driver details...</p>
      ) : error ? (
        // Show error message
        <p style={{ color: 'red', fontSize: '16px' }}>{error}</p>
      ) : (
        // Show driver data if available
        <table border="1" style={{ margin: '20px auto', width: '80%', textAlign: 'center' }}>
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
      )}
    </div>
  );
};

export default Autorickshaw;
