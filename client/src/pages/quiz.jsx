import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizForm from '../quizform';
import { useSelector } from "react-redux";

const Quiz = () => {
    const { currentUser, loading } = useSelector(state => state.user);
    const [questions, setQuestions] = useState([]);
    const [userResponses, setUserResponses] = useState([]);

    useEffect(() => {
        axios.post('/api/auth/showquestion')
            .then(response => setQuestions(response.data))
            .catch(error => console.error('Error fetching questions:', error));

        if (currentUser && currentUser.username) {
            axios.get(`/api/auth/userresponse/${currentUser.username}`)
                .then(response => {
                    if (response.data && response.data.responses) {
                        setUserResponses(response.data.responses);
                    }
                })
                .catch(error => console.error('Error fetching user responses:', error));
        }
    }, [currentUser]);

    const handleSubmit = (responses) => {
        axios.post('/api/auth/userresponse', { userId: currentUser.username, responses })
            .then(response => {
                console.log('Responses submitted:', response.data);
                setUserResponses(responses); // Update state to reflect saved responses
            })
            .catch(error => console.error('Error submitting responses:', error));
    };

    return (
        <div>
            <h1 style={{ marginTop: "100px" }}>Quiz</h1>
            <QuizForm questions={questions} onSubmit={handleSubmit} userResponses={userResponses} />
        </div>
    );
};

export default Quiz;
