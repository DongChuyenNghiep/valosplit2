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
                
                const responseResult = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findrespond', { userId: currentUser.username });
                
                if (responseResult.data && responseResult.data.userresponse) {
                    const userResponses = responseResult.data.userresponse.reduce((acc, response) => {
                        acc[response.questionId] = response.selectedOption;
                        return acc;
                    }, {});
                    setResponses(userResponses);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [userId]);

    const handleOptionChange = (questionId, selectedOption) => {
        setResponses({ ...responses, [questionId]: selectedOption });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const responsePayload = Object.keys(responses).map(questionId => ({
                questionId,
                selectedOption: responses[questionId]
            }));

            await axios.post('https://valosplit2-backend.vercel.app/api/auth/responses', {
                userId,
                responses: responsePayload
            });
        } catch (error) {
            console.error('Error submitting responses:', error);
        }
    };

    const logChecked = (questionId, option) => {
        return responses[questionId] === option.teamname;
    };

    return (
        <div className="App" style={{ marginTop: "150px" }}>
            <form onSubmit={handleSubmit}>
                {questions.map((question) => (
                    <div key={question._id}>
                        <h3>{question.question}</h3>
                        {question.choice.map((option, index) => (
                            <div key={index} onClick={() => handleOptionChange(question._id, option.teamname)} style={{ cursor: 'pointer', border: logChecked(question._id, option) ? '2px solid blue' : 'none' }}>
                                <img src={`https://drive.google.com/thumbnail?id=${option.logoid}`} alt={option.teamname} style={{ width: '100px', height: '100px' }} />
                                <p>{option.teamname}</p>
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
