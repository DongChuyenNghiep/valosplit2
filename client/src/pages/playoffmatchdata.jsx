import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/playoffdata.css';

const imagesagent = import.meta.glob('../agent/*.{png,jpg,jpeg,gif}');

export default function MatchHistoryPlayoff() {
    const [matches, setMatches] = useState({ semiFinal: [], finalupper: [], semilower: [], finallower: [], finalall: [] });
    const [agentImages, setAgentImages] = useState({});
    const [error, setError] = useState(null);

    const idmatches = ["semifinal1", "semifinal2", "semifinal4", "semifinal5", "finalupper1", "finalupper2", "finalupper3", "semilower1", "semilower2", "semilower3", "finallower1", "finallower2", "finallower3", "finalall1", "finalall2", "finalall3"];
    const semiFinalsIds = ["semifinal1", "semifinal2", "semifinal4", "semifinal5"];
    const finalupperIds = ["finalupper1", "finalupper2"];
    const semilowerIds = ["semilower1", "semilower2", "semilower3"];
    const finallowerIds = ["finallower1", "finallower2"];
    const finalallIds = ["finalall1", "finalall2", "finalall3"];
    const matchTitles = {
        "semifinal1": "Team Young Gen vs Team DCN",
        "semifinal4": "Team NPC Slayder vs Team Good Eco",
    };

    useEffect(() => {
        const fetchMatches = async () => {
            const fetchedMatches = [];
            for (const idmatch of idmatches) {
                try {
                    const res = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findallmatchplayoff', { idmatch });
                    fetchedMatches.push({ ...res.data, id: idmatch });
                    setMatches(prevMatches => ({
                        semiFinal: fetchedMatches.filter(match => semiFinalsIds.includes(match.id)),
                        finalupper: fetchedMatches.filter(match => finalupperIds.includes(match.id)),
                        semilower: fetchedMatches.filter(match => semilowerIds.includes(match.id)),
                        finallower: fetchedMatches.filter(match => finallowerIds.includes(match.id)),
                        finalall: fetchedMatches.filter(match => finalallIds.includes(match.id))
                    }));
                } catch (err) {
                    console.error(`Failed to fetch match with id ${idmatch}:`, err);
                }
            }
        };

        fetchMatches();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = {};
            for (const path in imagesagent) {
                const module = await imagesagent[path]();
                const agentName = path.split('/').pop().split('.').shift();
                loadedImages[agentName] = module.default;
            }
            setAgentImages(loadedImages);
        };

        loadImages();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    useEffect(() => {
        function show() {
            const showWordsElements = document.querySelectorAll('.row1');
            const wordBoxElements = document.querySelectorAll('.wordBox1');
            const isBoxVisible = Array.from({ length: showWordsElements.length }).fill(false);

            showWordsElements.forEach((showWords, index) => {
                showWords.addEventListener('click', function (e) {
                    e.preventDefault();

                    if (isBoxVisible[index]) {
                        wordBoxElements[index].style.display = 'none'; // Hide the box
                    } else {
                        wordBoxElements[index].style.display = 'block'; // Show the box
                    }

                    isBoxVisible[index] = !isBoxVisible[index]; // Toggle the state
                });
            });
        };

        show();

    }, [matches]); // Depend on matches to rerun only when matches change

    const calculateKDA = (teamData) => {
        const totalKills = teamData.reduce((total, player) => total + parseInt(player.K, 10), 0);
        const totalDeaths = teamData.reduce((total, player) => total + parseInt(player.D, 10), 0);
        const totalAssists = teamData.reduce((total, player) => total + parseInt(player.A, 10), 0);
        return `${totalKills}/${totalDeaths}/${totalAssists}`
    }

    const renderMatches = (matches, title) => (
        <>
            <h3 style={{ textAlign: "center" }}>{title}</h3>
            {matches.length > 0 ? (
                matches.map((match, index) => (
                    <div key={index} className='play-off'>
                        <h3>{matchTitles[match.id]}</h3>
                        <div className="row2">
                            <div className="row1">
                                <div className="team">
                                    <img className="team-logo" src={`https://drive.google.com/thumbnail?id=${match.logoteamleft}`} alt="Logo" />
                                    <span className="team-name">{match.teamNameleft}</span>
                                </div>
                                <div className="score-container">
                                    <span className="score">
                                        <span className="score-left">{match.scoreteamleft}</span>
                                        <span className="gach">-</span>
                                        <span className="score-right">{match.scoreteamright}</span>
                                    </span>
                                </div>
                                <div className="team">
                                    <span className="team-name">{match.teamNameright}</span>
                                    <img className="team-logo" src={`https://drive.google.com/thumbnail?id=${match.logoteamright}`} alt="Logo" />
                                </div>
                            </div>
                            <div className='wordBox1'>
                                {['infoTeamleft', 'infoTeamright'].map((team, i) => (
                                    <div key={i} className={i === 0 ? 'team-left' : 'team-right'}>
                                        <p style={{ textAlign: "center", padding: "15px 0 0px", margin: "0px" }}>
                                            {i === 0 ? match.teamNameleft : match.teamNameright}
                                        </p>
                                        <p style={{ textAlign: "center", margin: "12px 0 15px" }}>
                                            KDA: {calculateKDA(match[team])}
                                        </p>
                                        <div className='wrapper'>
                                            <table className={`team${i + 1}`}>
                                                <thead>
                                                    <tr className='title'>
                                                        <th className="first-col"></th>
                                                        {['AVG Score', 'K', 'D', 'A', 'KD', 'ADR', 'HS', 'KAST', 'FK', 'MK'].map((header, index) => (
                                                            <th key={index}>{header}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {match[team].map((player, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="first-col">
                                                                    <img className="agent-pick" src={agentImages[player.Agent]} alt={agentImages[player.Agent]} />
                                                                    <span>{player.IGN}</span>
                                                                </div>
                                                            </td>
                                                            {['ACS', 'K', 'D', 'A', 'KD', 'ADR', 'HS', 'KAST', 'FK', 'MK'].map((stat, idx) => (
                                                                <td key={idx}>{player[stat]}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ textAlign: "center", fontSize: "18px" }}><div className="lds-ring"><div></div><div></div><div></div><div></div></div></p>
            )}
        </>
    );

    return (
        <>
            <div className="back">
                <Link to='/valorant/swissstage'> &lt; Swiss-stage</Link>
            </div>
            <div className='button-play-off'>
                <Link to='/valorant/playoff'>Nhánh Play-off</Link>
                <Link to='/valorant/dataplayoff' className='active'>Match Data</Link>
            </div>
            <div style={{ width: "82%", margin: "0 auto" }}>
                {renderMatches(matches.semiFinal, 'Vòng bán kết')}
                {renderMatches(matches.finalupper, 'Vòng chung kết nhánh trên')}
                {renderMatches(matches.semilower, 'Bán kết nhánh dưới')}
                {renderMatches(matches.finallower, 'Chung kết nhánh dưới')}
                {renderMatches(matches.finalall, 'Chung kết tổng')}
            </div>
            {error && <p className="error">{error}</p>}
        </>
    );
}
