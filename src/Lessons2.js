import React, { useEffect, useState } from 'react';
// pull from db
const Lessons2 = () => {
    console.log('Lessons component mounted');
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNotes = async () => {
        try {
            console.log('Fetching notes...');
            const response = await fetch('http://localhost:5001/api/lessons');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setNotes(data);
        } catch (err) {
            console.error('Error fetching notes:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Lessons</h1>
            {notes.map((note, index) => (
                <div key={index}>
                    <h2>{note.heading}</h2>
                    <p>{note.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Lessons2;
