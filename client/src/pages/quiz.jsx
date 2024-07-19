import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});
    const { currentUser, loading } = useSelector(state => state.user);
    const userId = currentUser.username; // This would typically be dynamic

    useEffect(() => {
        async function fetchData() {
            try {
                const questionResult = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findquestions');
                setQuestions(questionResult.data);
            
                
                const responseResult = await axios.post(`https://valosplit2-backend.vercel.app/api/auth/findrespond`);
                const userResponses = responseResult.data.reduce((acc, response) => {
                    acc[response.questionId._id] = response.selectedOption;
                    return acc;
                }, {});
                setResponses(userResponses);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        console.log(responses)
        fetchData();
    }, [userId]);

    useEffect(() => {
        console.log('Updated questions:', questions);
    }, [questions]);

    const handleOptionChange = (questionId, selectedOption) => {
        setResponses({ ...responses, [questionId]: selectedOption });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            for (const questionId of Object.keys(responses)) {
                await axios.post('https://valosplit2-backend.vercel.app/api/auth/responses', {
                    userId,
                    questionId,
                    selectedOption: responses[questionId]
                });
            }
            console.log("Suubmit successfully")
        } catch (error) {
            console.error('Error submitting responses:', error);
        }
    };
    console.log(responses)
    return (
        <div className="App" style={{marginTop:"150px"}}>
            <form onSubmit={handleSubmit}>
                {questions.map((question) => (
                    <div key={question._id}>
                        <h3>{question.question}</h3>
                        {question.choice.map((option, index) => {
                            console.log('Current response for question:', question._id, responses[question._id]);
                            return (
                                <div key={index}>
                                    <input
                                        type="radio"
                                        name={question._id}
                                        value={option}
                                        checked={responses[question._id] === option}
                                        onChange={() => handleOptionChange(question._id, option)}
                                    />
                                    <label>{option}</label>
                                </div>
                            );
                        })}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Quiz;
