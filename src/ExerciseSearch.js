import React, { useState } from 'react';
import axios from 'axios';

function ExerciseSearch() {
    const [muscle, setMuscle] = useState('');
    const [exerciseResults, setExerciseResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://work-out-api1.p.rapidapi.com/search', {
                params: { Muscles: muscle },
                headers: {
                    'X-RapidAPI-Key': '6940c49e63mshfff121a957a040dp119beajsn02bd62be6f2e',
                    'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
                }
            });
            setExerciseResults(response.data);
            console.log(response.data)
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Exercise Search</h1>
            <div>
                <label htmlFor="muscle">Enter Muscle Name:</label>
                <input
                    type="text"
                    id="muscle"
                    placeholder="e.g., biceps"
                    value={muscle}
                    onChange={(e) => setMuscle(e.target.value)}
                />
                <button onClick={handleSearch} disabled={loading}>Search</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div>
                {setExerciseResults.length > 0 ? (
        <ul>
            {exerciseResults.map((exercise, index) => (
                <li key={index}>
                    <h2>{exercise.WorkOut}</h2>
                    <p>Intensity Level: {exercise.Intensity_Level}</p>
                    {/* <p>Beginner Sets: {exercise['Beginner Sets']}</p> */}
                    <p>Intermediate Sets: {exercise['Intermediate Sets']}</p>
                    {/* Add more details as needed */}
                </li>
            ))}
        </ul>
    ) : (
        <p>No exercises found for {muscle}.</p>
    )}
            </div>
        </div>
    );
}

export default ExerciseSearch;
