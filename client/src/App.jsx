import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

export default function TeamInfo() {
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (loading || !currentUser) {
      // If user data is still loading or not available, don't make the request
      return;
    }

    const fetchTeam = async () => {
      try {
        const response = await axios.post('/api/auth/findteam', {
          player: currentUser.riotID, // Use the actual player ID
        });
        setTeam(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchTeam();
  }, [currentUser, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Team: Không có</div>;
  }

  if (!team) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <p>Team: {team.team} ({team.shortname})</p>
      <img src={`https://drive.google.com/thumbnail?id=${team.logoURL}`} style={{width:"45%",aspectRatio:"1/1"}} /> 
    </>
  );
};
