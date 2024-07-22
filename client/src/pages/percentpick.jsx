import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizResults = () => {
  const [data, setData] = useState([]);
  const [percentages, setPercentages] = useState({});

  useEffect(() => {
    axios.post('http://localhost:3000/api/auth/findallrespond')
      .then(response => {
        setData(response.data);
        const calculatedPercentages = calculatePercentages(response.data);
        setPercentages(calculatedPercentages);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const calculatePercentages = (data) => {
    const questionStats = {};

    data.forEach(user => {
      user.userresponse.forEach(response => {
        const questionId = response.questionId;
        const selectedOption = response.selectedOption;

        if (!questionStats[questionId]) {
          questionStats[questionId] = { total: 0, options: {} };
        }

        if (!questionStats[questionId].options[selectedOption]) {
          questionStats[questionId].options[selectedOption] = 0;
        }

        questionStats[questionId].total++;
        questionStats[questionId].options[selectedOption]++;
      });
    });

    const percentages = {};

    for (const questionId in questionStats) {
      percentages[questionId] = {};
      const total = questionStats[questionId].total;

      for (const option in questionStats[questionId].options) {
        const count = questionStats[questionId].options[option];
        percentages[questionId][option] = ((count / total) * 100).toFixed(2) + '%';
      }
    }

    return percentages;
  };

  return (
    <div>
      <h1>Quiz Results</h1>
      {Object.keys(percentages).length === 0 ? (
        <p>Loading...</p>
      ) : (
        Object.keys(percentages).map(questionId => (
          <div key={questionId}>
            <h2>Question ID: {questionId}</h2>
            {Object.keys(percentages[questionId]).map(option => (
              <p key={option}>{option}: {percentages[questionId][option]}</p>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default QuizResults;
