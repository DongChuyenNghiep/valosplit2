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
            const questionResult = await axios.post('/api/auth/findquestions');
            setQuestions(questionResult.data);
            console.log(questions)
            const responseResult = await axios.post(`/api/auth/responses/${userId}`);
            const userResponses = responseResult.data.reduce((acc, response) => {
                acc[response.questionId._id] = response.selectedOption;
                return acc;
            }, {});
            setResponses(userResponses);
        }
        fetchData();
    }, []);

    const handleOptionChange = (questionId, selectedOption) => {
        setResponses({ ...responses, [questionId]: selectedOption });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        for (const questionId of Object.keys(responses)) {
            await axios.post('/api/auth/responses', {
                userId,
                questionId,
                selectedOption: responses[questionId]
            });
        }
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                {questions.map((question) => (
                    <div key={question._id}>
                        <h3>{question.questionText}</h3>
                        {question.options.map((option, index) => (
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
                        ))}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Quiz;
