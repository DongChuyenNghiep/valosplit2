import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
        const uniqueQuestionId = `${questionId}-${questionIndex}`;
        setResponses(prevResponses => {
            const newResponses = { ...prevResponses, [uniqueQuestionId]: selectedOption };
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
                    questionIndex: parseInt(questionIndex, 10), // Convert to integer
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
