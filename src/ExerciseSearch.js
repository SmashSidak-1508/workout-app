import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, CircularProgress, Container, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ExerciseSearch() {
    const [muscle, setMuscle] = useState('');
    const [exerciseResults, setExerciseResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchExercises = useCallback(async () => {
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
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }, [muscle]);

    useEffect(() => {
        if (muscle.trim() !== '') {
            fetchExercises();
        }
    }, [fetchExercises, muscle]);

    return (
        <Container maxWidth="md">
            <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '20px' }}>Exercise Recommendation System</Typography>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <TextField
                    label="Enter Muscle Name"
                    variant="outlined"
                    value={muscle}
                    onChange={(e) => setMuscle(e.target.value)}
                    style={{ marginRight: '10px', width: '100%' }} // Adjust width for responsiveness
                />
                <Button variant="contained" onClick={fetchExercises} disabled={loading} style={{ width: '100px' }}> {/* Adjust width for responsiveness */}
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
                </Button>
            </div>
            {loading && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}
            {error && <Typography variant="body1" color="error" align="center" gutterBottom>Error: {error}</Typography>}
            {exerciseResults.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Workout</TableCell>
                                <TableCell>Intensity Level</TableCell>
                                <TableCell>Explanation</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exerciseResults.map((exercise, index) => (
                                <TableRow key={index}>
                                    <TableCell>{exercise.WorkOut}</TableCell>
                                    <TableCell>{exercise.Intensity_Level}</TableCell>
                                    <TableCell>{exercise.Explaination}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body1" align="center">No exercises found for {muscle}.</Typography>
            )}
        </Container>
    );
}

export default ExerciseSearch;
