// src/Form.jsx
import React, { useState } from 'react';
import { Databases } from 'appwrite';
import { client } from './appwriteConfig';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const databases = new Databases(client);

        try {
            const response = await databases.createDocument(
                'YOUR_DATABASE_ID', // Replace with your database ID
                'YOUR_COLLECTION_ID', // Replace with your collection ID
                {
                    name,
                    email
                }
            );
            console.log('Document created:', response);
        } catch (error) {
            console.error('Error creating document:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;
