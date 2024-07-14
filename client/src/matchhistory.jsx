import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
const imagesagent = import.meta.glob('./agent/*.{png,jpg,jpeg,gif}');

export default function MatchHistory() {
    const { currentUser } = useSelector(state => state.user); // Assuming you are using Redux to get the current user
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(null);
    const [agentImages, setAgentImages] = useState({});
    
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
    }, []);

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

    }, [matches]);
    
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findmatchid', {
                    ign: currentUser.riotID,
                });
                const matches = response.data;
                
                setMatches(matches);
            } catch (err) {
                console.error("Error occurred:", err);
                setError(err);
            }
        };

        fetchMatches();
    }, [currentUser.riotID]);
    
    const calculateKDA = (teamData) => {
        const totalKills = teamData.reduce((total, player) => total + parseInt(player.K, 10), 0);
        const totalDeaths = teamData.reduce((total, player) => total + parseInt(player.D, 10), 0);
        const totalAssists = teamData.reduce((total, player) => total + parseInt(player.D, 10), 0);
        return `${totalKills}/${totalDeaths}/${totalAssists}`
    }
    
    const determineWinner = (match) => {
        if (match.scoreteamleft > match.scoreteamright) {
            return 'left';
        } else {
            return 'right';
        }
    };

    const isCurrentUserInTeam = (teamData) => {
        return teamData.some(player => player.IGN === currentUser.riotID);
    };

    const renderMatches = (matches) => (
        <>
            {matches.length > 0 ? (
                matches.map((match, index) => {
                    const winningTeam = determineWinner(match);
                    const currentUserTeam = isCurrentUserInTeam(match.infoTeamleft) ? 'left' : 'right';
                    const resultClass = (currentUserTeam === winningTeam) ? 'winner' : 'lose';
                    const leftTeamClass = isCurrentUserInTeam(match.infoTeamleft) ? 'myteam' : '';
                    const rightTeamClass = isCurrentUserInTeam(match.infoTeamright) ? 'myteam' : '';

                    return (
                        <div key={index} className="row2">
                            <div className={`row1 ${resultClass}`}>
                                <div className="team">
                                    <img className="team-logo" src={`https://drive.google.com/thumbnail?id=${match.logoteamleft}`} alt="Logo" />
                                    <span className={`team-name ${leftTeamClass}`}>{match.teamNameleft}</span>
                                </div>
                                <div className="score-container">
                                    <span className="score">
                                        <span className="score-left">{match.scoreteamleft}</span>
                                        <span className="gach">-</span>
                                        <span className="score-right">{match.scoreteamright}</span>
                                    </span>
                                </div>
                                <div className="team">
                                    <span className={`team-name ${rightTeamClass}`}>{match.teamNameright}</span>
                                    <img className="team-logo" src={`https://drive.google.com/thumbnail?id=${match.logoteamright}`} alt="Logo" />
                                </div>
                            </div>
                            <div className='wordBox1'>
                                {['infoTeamleft', 'infoTeamright'].map((team, i) => (
                                    <div key={i} className={i === 0 ? 'team-left' : 'team-right'}>
                                        <p style={{ textAlign: "center", padding: "15px 0 5px", margin:"0" }}>
                                            {i === 0 ? match.teamNameleft : match.teamNameright}
                                        </p>
                                        <p style={{ textAlign: "center", padding: "5px 0 5px" }}>
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
                                                        <tr key={index} className={player.IGN === currentUser.riotID ? 'me' : ''}>
                                                            <td>
                                                                <div className="first-col">
                                                                    <img className="agent-pick" src={agentImages[player.Agent]} />
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
                    );
                })
            ) : (
                <p style={{ textAlign: "center", fontSize: "18px" }}>Loading...</p>
            )}
        </>
    );

    return (
        <>
            {error ? (
                <p style={{ textAlign: "center", fontSize: "20px" }}>Người chơi này chưa đấu trận nào.</p>
            ) : (
                renderMatches(matches)
            )}
        </>
    );
}
