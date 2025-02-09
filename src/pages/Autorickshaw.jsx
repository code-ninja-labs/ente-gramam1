import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Ensure the path to supabaseClient is correct

const Autorickshaw = () => {
  const [drivers, setDrivers] = useState([]); // Driver data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state for debugging

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true); // Display loading state

        // Fetch driver details
        const { data, error } = await supabase
          .from('autorickshaw-drivers') // Check correct table name
          .select('*'); // Fetch all columns

        if (error) {
          throw error; // Handle any errors from Supabase
        }

        if (data.length === 0) {
          setError('No drivers found in the database.');
          setDrivers([]);
        } else {
          setDrivers(data);
          setError(null); // Clear error state
        }
      } catch (err) {
        // Categorize errors
        if (err.message.includes('Invalid API key')) {
          setError('Invalid API key: Please check your Supabase configuration.');
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchDrivers(); // Trigger the function on component load
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Autorickshaw Drivers</h1>
      <p>Find details about autorickshaw drivers available in your area.</p>

      {/* Show loading, errors, or driver data */}
      {loading ? (
        <p>Loading driver details...</p>
      ) : error ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
      ) : (
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
