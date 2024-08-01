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

  const teamCache = useRef({});
  const profileCache = useRef({});

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
            const { IGN, K, D, A, ACS, ADR, HS, KAST, FK, MK } = player;
            if (!statsMap[IGN]) {
              statsMap[IGN] = { K: 0, D: 0, A: 0, ACS: 0, ADR: 0, HS: 0, KAST: 0, FK: 0, MK: 0, matchCount: 0, team: '', logoURL: '', profilePicture: '' };
            }
            statsMap[IGN].K += parseInt(K, 10);
            statsMap[IGN].D += parseInt(D, 10);
            statsMap[IGN].A += parseInt(A, 10);
            statsMap[IGN].ACS += parseInt(ACS, 10);
            statsMap[IGN].ADR += parseInt(ADR, 10);
            statsMap[IGN].HS += parseInt(HS, 10);
            statsMap[IGN].KAST += parseInt(KAST, 10);
            statsMap[IGN].FK += parseInt(FK, 10);
            statsMap[IGN].MK += parseInt(MK, 10);
            statsMap[IGN].matchCount += 1;
            playerSet.add(IGN);
          });
        });

        const playerList = Array.from(playerSet);
        const teamPromises = playerList.map(player => fetchTeamData(player));
        const profilePromises = playerList.map(player => fetchProfileData(player));

        const teamData = await Promise.all(teamPromises);
        const profileData = await Promise.all(profilePromises);

        teamData.forEach((result, index) => {
          if (result) {
            const { IGN, team, logoURL } = result;
            statsMap[IGN].team = team;
            statsMap[IGN].logoURL = logoURL;
          }
        });

        profileData.forEach((result, index) => {
          if (result) {
            const { IGN, profilePicture } = result;
            statsMap[IGN].profilePicture = profilePicture;
          }
        });

        let statsArray = Object.entries(statsMap).map(([IGN, stats]) => ({
          IGN,
          team: stats.team,
          logoURL: stats.logoURL,
          profilePicture: stats.profilePicture,
          match: stats.matchCount,
          ACS: (stats.ACS / stats.matchCount).toFixed(1),
          K: stats.K,
          D: stats.D,
          A: stats.A,
          KDA: ((stats.K + stats.A) / stats.D).toFixed(1),
          ADR: (stats.ADR / stats.matchCount).toFixed(1),
          HS: (stats.HS / stats.matchCount).toFixed(1),
          KAST: (stats.KAST / stats.matchCount).toFixed(1),
          FK: stats.FK,
          MK: stats.MK
        }));

        statsArray.sort((a, b) => parseFloat(b.ACS) - parseFloat(a.ACS));

        setPlayerStats(statsArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching match data', error);
        setLoading(false);
      }
    };

    const fetchTeamData = async (IGN) => {
      if (teamCache.current[IGN]) {
        return teamCache.current[IGN];
      }
      try {
        const response = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findteam', { player: IGN });
        const { team, logoURL } = response.data;
        const result = { IGN, team, logoURL };
        teamCache.current[IGN] = result;  // Cache the result
        return result;
      } catch (error) {
        console.error(`Error fetching team data for ${IGN}`, error);
        return null;
      }
    };

    const fetchProfileData = async (IGN) => {
      if (profileCache.current[IGN]) {
        return profileCache.current[IGN];
      }
      try {
        const response = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findplayer', { riotID: IGN });
        const { profilePicture } = response.data;
        const result = { IGN, profilePicture };
        profileCache.current[IGN] = result;  // Cache the result
        return result;
      } catch (error) {
        console.error(`Error fetching profile data for ${IGN}`, error);
        return { IGN, profilePicture: '1dJXC3sq1fK3XKrRsTq3AfPUtalLrzds1' };
      }
    };

    fetchAllMatches();
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
            <h3>Thông số mọi người chơi</h3>
            <div className='bxh wrapper' style={{ justifyContent: "flex-start" }}>
              <table className="my-table" id="leaderboard" ref={tableRef}>
                <thead className="title">
                  <tr>
                    <th>Rank</th>
                    <th>Player Name</th>
                    <th>Team</th>
                    <th>Match Played</th>
                    <th>ACS</th>
                    <th>K</th>
                    <th>D</th>
                    <th>A</th>
                    <th>KDA</th>
                    <th>ADR</th>
                    <th>HS (%)</th>
                    <th>KAST (%)</th>
                    <th>FB</th>
                    <th>MK</th>
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
                      <td>{player.match}</td>
                      <td>{player.ACS}</td>
                      <td>{player.K}</td>
                      <td>{player.D}</td>
                      <td>{player.A}</td>
                      <td>{player.KDA}</td>
                      <td>{player.ADR}</td>
                      <td>{player.HS}</td>
                      <td>{player.KAST}</td>
                      <td>{player.FK}</td>
                      <td>{player.MK}</td>
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
