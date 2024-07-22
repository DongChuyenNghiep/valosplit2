import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import QuizResults from './percentpick';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});
    const { currentUser } = useSelector(state => state.user);
    const userId = currentUser.username; // This would typically be dynamic

    useEffect(() => {
        async function fetchData() {
            try {
                const questionResult = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findquestions');
                setQuestions(questionResult.data);
                
                const responseResult = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findrespond', { userId: currentUser.username });
                
                if (responseResult.data && responseResult.data.userresponse) {
                    const userResponses = responseResult.data.userresponse.reduce((acc, response) => {
                        acc[response.question] = response.selectedOption;
                        return acc;
                    }, {});
                    setResponses(userResponses);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [userId, currentUser.username]);

    const handleOptionChange = (questionId, questionIndex, selectedOption) => {
        const uniqueQuestionId = `${questionId}-${questionIndex}`;
        setResponses({ ...responses, [uniqueQuestionId]: selectedOption });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const responsePayload = Object.keys(responses).map(uniqueQuestionId => {
                const [questionSetId, questionIndex] = uniqueQuestionId.split('-');
                return {
                    idquestionset: questionSetId,
                    questionIndex,
                    selectedOption: responses[uniqueQuestionId]
                };
            });

            await axios.post('/api/auth/responses', {
                userId,
                userresponse: responsePayload
            });
        } catch (error) {
            console.error('Error submitting responses:', error);
        }
    };

    const logChecked = (questionId, questionIndex, option) => {
        const uniqueQuestionId = `${questionId}-${questionIndex}`;
        return responses[uniqueQuestionId] === option.teamname;
    };

    return (
        <div className="App" style={{ marginTop: "150px" }}>
            <form onSubmit={handleSubmit}>
                {questions.map((questionSetObject) => (
                    <div key={questionSetObject._id}>
                        <h2>Question Set: {questionSetObject.idquestionset}</h2>
                        {questionSetObject.questionSet.map((question, index) => (
                            <div key={index}>
                                <h3>{question.question}</h3>
                                {question.choice.map((option, idx) => (
                                    <div key={idx} onClick={() => handleOptionChange(questionSetObject._id, index, option.teamname)} style={{ cursor: 'pointer', border: logChecked(questionSetObject._id, index, option) ? '2px solid blue' : 'none' }}>
                                        <img src={`https://drive.google.com/thumbnail?id=${option.imageid}`} alt={option.teamname} style={{ width: '100px', height: '100px' }} />
                                        <p>{option.teamname}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Quiz;