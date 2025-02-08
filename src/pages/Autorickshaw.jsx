import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Import Supabase client

const Autorickshaw = () => {
  const [drivers, setDrivers] = useState([]); // To store autorickshaw driver details
  const [loading, setLoading] = useState(true); // To manage loading state

  // Fetch driver details when the component mounts
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const { data, error } = await supabase
          .from('autorickshaw-drivers') // Table name in Supabase
          .select('name, phone'); // Query specific columns: name and phone

        if (error) throw error; // Log any errors
        setDrivers(data); // Save the retrieved data to state
      } catch (err) {
        console.error('Error fetching drivers', err.message);
      } finally {
        setLoading(false); // Stop showing the loading spinner
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Autorickshaw Drivers</h1>
      <p>Find details about autorickshaw drivers available in your area:</p>

      {/* Show loading spinner while fetching */}
      {loading ? (
        <p>Loading driver details...</p>
      ) : drivers.length > 0 ? (
        /* Render table with driver details once loaded */
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
      ) : (
        /* Show this message if no driver data is available */
        <p>No drivers found in the database.</p>
      )}
    </div>
  );
};

export default Autorickshaw;
