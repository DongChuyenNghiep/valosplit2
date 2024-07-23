import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../css/pickem.css';

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

                const responseResult = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findrespond', { userId });
                console.log("Fetched responses:", responseResult.data.userresponse);
                if (responseResult.data && responseResult.data.userresponse) {
                    const userResponses = responseResult.data.userresponse.reduce((acc, response) => {
                        acc[`${response.idquestionset}-${response.questionIndex}`] = response.selectedOption;
                        return acc;
                    }, {});
                    setResponses(userResponses);
                    console.log("User responses set:", userResponses);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [userId]);

    const handleOptionChange = (questionId, questionIndex, selectedOption) => {
        setResponses(prevResponses => {
            const uniqueQuestionId = `${questionId}-${questionIndex}`;
            const newResponses = { ...prevResponses, [uniqueQuestionId]: selectedOption };

            // Clear the third question's response if the first two questions have the same response
            const firstQuestionId = `${questionId}-0`;
            const secondQuestionId = `${questionId}-1`;
            const thirdQuestionId = `${questionId}-2`;

            if (newResponses[firstQuestionId] === newResponses[secondQuestionId]) {
                newResponses[thirdQuestionId] = "";
            }

            console.log("Option changed:", newResponses);
            return newResponses;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const responsePayload = Object.keys(responses).map(uniqueQuestionId => {
                const [questionSetId, questionIndex] = uniqueQuestionId.split('-');
                return {
                    idquestionset: questionSetId,
                    questionIndex: parseInt(questionIndex), // Convert to integer
                    selectedOption: responses[uniqueQuestionId]
                };
            });

            console.log("Submitting responses:", {
                userId,
                userresponse: responsePayload
            });

            await axios.post('https://valosplit2-backend.vercel.app/api/auth/responses', {
                userId,
                userresponse: responsePayload
            });

            // No need to clear responses after submitting
            // setResponses({});
        } catch (error) {
            console.error('Error submitting responses:', error);
        }
    };

    const isOptionDisabled = (questionId, questionIndex) => {
        if (questionIndex !== 2) return false; // Only disable options for the third question (index 2)

        const firstQuestionId = `${questionId}-0`;
        const secondQuestionId = `${questionId}-1`;
        const firstResponse = responses[firstQuestionId];
        const secondResponse = responses[secondQuestionId];

        return firstResponse && secondResponse && firstResponse === secondResponse;
    };

    const logChecked = (questionId, questionIndex, option) => {
        const uniqueQuestionId = `${questionId}-${questionIndex}`;
        return responses[uniqueQuestionId] === option.teamname;
    };

    return (
        <div className="pickem" style={{ marginTop: "150px" }}>
            <form onSubmit={handleSubmit}>
                {questions.map((questionSetObject) => (
                    <div key={questionSetObject._id} className='question'>
                        <h2>Question Set: {questionSetObject.idquestionset}</h2>
                        {questionSetObject.questionSet.map((question, index) => (
                            <div key={index}>
                                <h3>{question.question}</h3>
                                <div className='each-question'>
                                {question.choice.map((option, idx) => (
                                    <div key={idx} onClick={() => !isOptionDisabled(questionSetObject._id, index) && handleOptionChange(questionSetObject._id, index, option.teamname)} style={{ cursor: 'pointer', border: logChecked(questionSetObject._id, index, option) ? '2px solid blue' : 'none', pointerEvents: isOptionDisabled(questionSetObject._id, index) ? 'none' : 'auto' }}>
                                        <img src={`https://drive.google.com/thumbnail?id=${option.imageid}`} alt={option.teamname} style={{ width: '100px', height: '100px' }} />
                                        <p>{option.teamname}</p>
                                    </div>
                                ))}
                                </div>
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
