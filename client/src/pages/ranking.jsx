import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-dt';

const PlayerStatsTable = () => {
  const [playerStats, setPlayerStats] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    const fetchAllMatches = async () => {
      try {
        const response = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findallmatch');
        const matches = response.data;
        const statsMap = {};
        const teamPromises = [];

        matches.forEach(match => {
          const players = [...match.infoTeamleft, ...match.infoTeamright];

          players.forEach(player => {
            const { IGN, K, D, A, ACS } = player;
            if (!statsMap[IGN]) {
              statsMap[IGN] = { K: 0, D: 0, A: 0, ACS: 0, matchCount: 0, team: '', logoURL: '' };
              teamPromises.push(fetchTeamData(IGN));
            }
            statsMap[IGN].K += parseInt(K, 10);
            statsMap[IGN].D += parseInt(D, 10);
            statsMap[IGN].A += parseInt(A, 10);
            statsMap[IGN].ACS += parseInt(ACS, 10);
            statsMap[IGN].matchCount += 1;
          });
        });

        // Wait for all team data to be fetched
        const teamData = await Promise.all(teamPromises);

        // Map team data to the statsMap
        teamData.forEach(({ IGN, team, logoURL }) => {
          if (statsMap[IGN]) {
            statsMap[IGN].team = team;
            statsMap[IGN].logoURL = logoURL;
          }
        });

        const statsArray = Object.entries(statsMap).map(([IGN, stats]) => ({
          IGN,
          team: stats.team,
          logoURL: stats.logoURL,
          ACS: (stats.ACS / stats.matchCount).toFixed(1),
          K: stats.K,
          D: stats.D,
          A: stats.A,
        }));

        setPlayerStats(statsArray);
      } catch (error) {
        console.error('Error fetching match data', error);
      }
    };

    const fetchTeamData = async (IGN) => {
      try {
        const response = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findteam', { player: IGN });
        const { team, logoURL } = response.data;
        return { IGN, team, logoURL };
      } catch (error) {
        console.error(`Error fetching team data for ${IGN}`, error);
        return { IGN, team: 'Unknown', logoURL: '' };
      }
    };

    fetchAllMatches();
  }, []);

  useEffect(() => {
    if (playerStats.length > 0) {
      $(tableRef.current).DataTable();
    }
  }, [playerStats]);

  return (
    <div>
      <h1>Player Statistics</h1>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th>Player Name</th>
            <th></th>
            <th>Team</th>
            
            <th>ACS</th>
            <th>Kills</th>
            <th>Deaths</th>
            <th>Assists</th>
          </tr>
        </thead>
        <tbody>
          {playerStats.map((player, index) => (
            <tr key={index}>
              <td>{player.IGN}</td>
              <td>
                {player.logoURL && <img src={`https://drive.google.com/thumbnail?id=${player.logoURL}`} alt={`${player.team} logo`} style={{ width: '50px', height: '50px' }} />}
              </td>
              <td>{player.team}</td>   
              <td>{player.ACS}</td>
              <td>{player.K}</td>
              <td>{player.D}</td>
              <td>{player.A}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStatsTable;
