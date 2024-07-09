import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed
import '../css/valorant.css';

const imagesagent = import.meta.glob('../agent/*.{png,jpg,jpeg,gif}');

export default function MatchInfo() {
    const [matches, setMatches] = useState({ quartFinal: [], semiFinal: [] });
    const [agentImages, setAgentImages] = useState({});
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(false); // State for active class

    const idmatches = ["123n3waaqeswq23", "fce7f9", "fce7f1", "fce7f952-00f2-4315-864c-2fc88e7dc37c", "fce7f3"];
    const quartFinalsIds = ["123n3waaqeswq23"];
    const semiFinalsIds = [];
    const matchTitles = {
        "123n3waaqeswq23": "Team A vs Team B",
        "fce7f3": "Team C vs Team D",
    };

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const fetchedMatches = await Promise.all(idmatches.map(idmatch =>
                    axios.post('/api/auth/findmatchid', { idmatch }).then(res => ({ ...res.data, id: idmatch }))
                ));
                setMatches({
                    quartFinal: fetchedMatches.filter(match => quartFinalsIds.includes(match.id)),
                    semiFinal: fetchedMatches.filter(match => semiFinalsIds.includes(match.id))
                });
            } catch (err) {
                setError(err);
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

        if (matches.quartFinal.length > 0 || matches.semiFinal.length > 0) {
            show();
        }
    }, [matches]); // Depend on matches to rerun only when matches change

    const calculateAverageKills = (teamData) => {
        const totalKills = teamData.reduce((total, player) => total + parseInt(player.K, 10), 0);
        return (totalKills / teamData.length).toFixed(2);
    }

    const handleButtonClick = () => {
        setIsActive(!isActive); // Toggle the active state
    }

    if (error) return <div>Error: {error.message}</div>;
    if (!matches.quartFinal.length && !matches.semiFinal.length && !Object.keys(agentImages).length) return <div>Loading...</div>;

    const renderMatches = (matches, title) => (
        <>
            <h2>{title}</h2>
            {matches.map((match, index) => (
                <div key={index}>
                    <h3>{matchTitles[match.id]}</h3>
                    <div className="row2">
                        <div className="row1">
                            <div className="team">
                                <img className="team-logo loser-darker" src={`https://drive.google.com/thumbnail?id=${match.logoteamleft}`} alt="Logo" />
                                <span className="team-name loser-darker">{match.teamNameleft}</span>
                            </div>
                            <div className="score-container">
                                <span className="score">
                                    <span className="score-left">{match.scoreteamleft}</span>
                                    <span className="gach">-</span>
                                    <span className="score-right">{match.scoreteamright}</span>
                                </span>
                            </div>
                            <div className="team">
                                <span className="team-name winner-brighter">{match.teamNameright}</span>
                                <img className="team-logo winner-brighter" src={`https://drive.google.com/thumbnail?id=${match.logoteamright}`} alt="Logo" />
                            </div>
                        </div>
                        <div className='wordBox1'>
                            {['infoTeamleft', 'infoTeamright'].map((team, i) => (
                                <div key={i} className={i === 0 ? 'team-left' : 'team-right'}>
                                    <div className='wrapper'>
                                        <p>{i === 0 ? match.teamNameleft : match.teamNameright}</p>
                                        <h4>Average Kills: {calculateAverageKills(match[team])}</h4>
                                        <table className={`team${i + 1}`}>
                                            <thead>
                                                <tr className='title'>
                                                    <th className="first-col"></th>
                                                    <th>AVG Score</th>
                                                    <th>K</th>
                                                    <th>D</th>
                                                    <th>A</th>
                                                    <th>KD</th>
                                                    <th>ADR</th>
                                                    <th>HS</th>
                                                    <th>KAST</th>
                                                    <th>FK</th>
                                                    <th>MK</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {match[team].map((player, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="first-col">
                                                                <img className="agent-pick" src={agentImages[player.Agent]} alt={player.Agent} />
                                                                <span>{player.IGN}</span>
                                                            </div>
                                                        </td>
                                                        <td>{player.ACS}</td>
                                                        <td>{player.K}</td>
                                                        <td>{player.D}</td>
                                                        <td>{player.A}</td>
                                                        <td>{player.KD}</td>
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );

    return (
        <div style={{ marginTop: "200px" }}>
            <button className={isActive ? 'active' : ''} onClick={handleButtonClick}>
                <Link to='/dataplayoff'>Data Play-off</Link>
            </button>
            {matches.quartFinal.length > 0 && renderMatches(matches.quartFinal, 'Vòng tứ kết')}
            {matches.semiFinal.length > 0 && renderMatches(matches.semiFinal, 'Vòng bán kết')}
        </div>
    );
}
