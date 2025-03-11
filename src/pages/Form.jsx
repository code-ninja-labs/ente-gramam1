import React, { useState } from 'react';
import { Client, Databases } from 'appwrite';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const client = new Client()
    .setEndpoint('https://YOUR_APPWRITE_ENDPOINT') // Replace with your Appwrite endpoint
    .setProject('67d0048000011482e309'); // Replace with your project ID

  const databases = new Databases(client);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const promise = await databases.createDocument(
        'YOUR_DATABASE_ID', // Replace with your database ID
        'YOUR_COLLECTION_ID', // Replace with your collection ID
        {
          name,
          email,
          message
        }
      );
      console.log('Document created:', promise);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
