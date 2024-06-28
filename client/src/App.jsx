import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
const TeamInfo = () => {
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser, loading } = useSelector((state) => state.user); 
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.post('/api/auth/findteam', {
          player: currentUser.riotID, // Replace with the actual team name or shortname you are querying

        });
        setTeam(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchTeam();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Team Info</h1>
      <p>Player 1: {team.team}</p>
    </div>
  );
};

export default TeamInfo;
