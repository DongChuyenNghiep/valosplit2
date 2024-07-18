import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/rank.css';

const PlayerStatsTable = () => {
  const [playerStats, setPlayerStats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;
  const tableRef = useRef(null);
  const paginationContainerRef = useRef(null);

  useEffect(() => {
    const fetchAllMatches = async () => {
      try {
        const response = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findallmatch');
        const matches = response.data;
        const statsMap = {};
        const playerSet = new Set();

        matches.forEach(match => {
          const players = [...match.infoTeamleft, ...match.infoTeamright];
          players.forEach(player => {
            const { IGN, K, D, A, ACS, ADR } = player;
            if (!statsMap[IGN]) {
              statsMap[IGN] = { K: 0, D: 0, A: 0, ACS: 0, ADR: 0, matchCount: 0, team: '', logoURL: '', profilePicture: '' };
            }
            statsMap[IGN].K += parseInt(K, 10);
            statsMap[IGN].D += parseInt(D, 10);
            statsMap[IGN].A += parseInt(A, 10);
            statsMap[IGN].ACS += parseInt(ACS, 10);
            statsMap[IGN].ADR += parseInt(ADR, 10);
            statsMap[IGN].matchCount += 1;
            playerSet.add(IGN);
          });
        });

        const playerList = Array.from(playerSet);
        const teamPromises = playerList.map(player => fetchTeamData(player));
        const profilePromises = playerList.map(player => fetchProfileData(player));

        const teamData = await Promise.allSettled(teamPromises);
        const profileData = await Promise.allSettled(profilePromises);

        teamData.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            const { IGN, team, logoURL } = result.value;
            statsMap[IGN].team = team;
            statsMap[IGN].logoURL = logoURL;
          } else {
            console.error(`Error fetching team data for ${playerList[index]}`, result.reason);
          }
        });

        profileData.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            const { IGN, profilePicture } = result.value;
            statsMap[IGN].profilePicture = profilePicture;
          } else {
            console.error(`Error fetching profile data for ${playerList[index]}`, result.reason);
          }
        });

        let statsArray = Object.entries(statsMap).map(([IGN, stats]) => ({
          IGN,
          team: stats.team,
          logoURL: stats.logoURL,
          profilePicture: stats.profilePicture,
          ACS: (stats.ACS / stats.matchCount).toFixed(1),
          K: stats.K,
          D: stats.D,
          A: stats.A,
          KDA: ((stats.K + stats.A) / stats.D).toFixed(1),
          ADR: (stats.ADR / stats.matchCount).toFixed(1),
        }));

        statsArray.sort((a, b) => parseFloat(b.ACS) - parseFloat(a.ACS));

        setPlayerStats(statsArray);
        setLoading(false);

        localStorage.setItem('playerStats', JSON.stringify(statsArray));
        localStorage.setItem('lastFetch', Date.now());
      } catch (error) {
        console.error('Error fetching match data', error);
        setLoading(false);
      }
    };

    const fetchTeamData = async (IGN) => {
      try {
        const response = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findteam', { player: IGN });
        const { team, logoURL } = response.data;
        return { IGN, team, logoURL };
      } catch (error) {
        throw new Error(`Failed to fetch team data for ${IGN}`);
      }
    };

    const fetchProfileData = async (IGN) => {
      try {
        const response = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findplayer', { riotID: IGN });
        const { profilePicture } = response.data;
        return { IGN, profilePicture };
      } catch (error) {
        return { IGN, profilePicture: '1dJXC3sq1fK3XKrRsTq3AfPUtalLrzds1' };
      }
    };

    const loadData = () => {
      const cachedData = localStorage.getItem('playerStats');
      const lastFetch = localStorage.getItem('lastFetch');
      const now = Date.now();
      const oneHour = 60 * 60 * 1000;

      if (cachedData && lastFetch && (now - lastFetch) < oneHour) {
        setPlayerStats(JSON.parse(cachedData));
        setLoading(false);
      } else {
        fetchAllMatches();
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!tableRef.current || !paginationContainerRef.current) return;

    const tbody = tableRef.current.querySelector('tbody');
    const totalPages = Math.ceil(tbody.rows.length / itemsPerPage);

    const showPage = (page) => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const rows = Array.from(tbody.rows);

      rows.forEach((row, index) => {
        row.style.display = (index >= startIndex && index < endIndex) ? '' : 'none';
      });
    };

    const generatePaginationLinks = () => {
      const paginationList = paginationContainerRef.current.querySelector('.pagination');
      paginationList.innerHTML = '';

      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = i;
        a.addEventListener('click', (event) => {
          event.preventDefault();
          setCurrentPage(i);
        });
        li.appendChild(a);
        paginationList.appendChild(li);
      }
    };

    const highlightCurrentPage = () => {
      const paginationLinks = paginationContainerRef.current.querySelectorAll('.pagination a');
      paginationLinks.forEach((link, index) => {
        link.classList.remove('active');
        if (index + 1 === currentPage) {
          link.classList.add('active');
        }
      });
    };

    showPage(currentPage);
    generatePaginationLinks();
    highlightCurrentPage();
  }, [currentPage, playerStats]);

  return (
    <>
      <div className='button-stat' style={{ position: "absolute" }}>
        <Link to='/valorant/stat'>My stat</Link>
        <Link to='/valorant/rank' className='active'>All Stat</Link>
      </div>
      <div className='container1' style={{ margin: "180px auto 40px", justifyContent: "flex-start" }}>
        {loading ? (
          <div className='container1'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        ) : (
          <>
            <h3>Top ACS</h3>
            <div className='bxh' style={{ justifyContent: "flex-start" }}>
              <table className="my-table" id="leaderboard" ref={tableRef}>
                <thead className="title">
                  <tr>
                    <th>Rank</th>
                    <th>Player Name</th>
                    <th>Team</th>
                    <th>ACS</th>
                  </tr>
                </thead>
                <tbody>
                  {playerStats.map((player, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td style={{ textAlign: 'left', borderColor: "white" }}>
                        {player.profilePicture && <img src={`https://drive.google.com/thumbnail?id=${player.profilePicture}`} alt={`${player.IGN} profile`} style={{ height: '50px', width: "50px", borderRadius: "50%", marginRight: "10px" }} />}
                        <Link to={`/valorant/stat/${player.IGN}`}>{player.IGN}</Link>
                      </td>
                      <td style={{ textAlign: 'left' }}>
                        {player.logoURL && <img src={`https://drive.google.com/thumbnail?id=${player.logoURL}`} alt={`${player.team} logo`} style={{ width: '50px', height: '50px', marginRight: "10px" }} />}
                        {player.team}
                      </td>
                      <td>{player.ACS}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div id="pagination-container" ref={paginationContainerRef}>
              <ul className="pagination"></ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PlayerStatsTable;
