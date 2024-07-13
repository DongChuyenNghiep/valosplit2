// Stat.js
import '../css/chart.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TeamInfo from '../App.jsx';
import RadarChart from '../Chart.jsx';
import '../css/stat.css';
import MatchHistory from '../matchhistory.jsx';
export default function Stat() {
    document.title = "Thông số";
    const [team, setTeam] = useState(null);
    const [countMatch, setCountMatch] = useState(0);
    const [totalKills, setTotalKills] = useState(0);
    const [totalDeaths, setTotalDeaths] = useState(0);
    const [totalAssists, setTotalAssists] = useState(0);
    const [KDAAll, setKDAAll] = useState(0);
    const [KDA, setKDA] = useState(0);
    const [averageACSAll, setAverageACSAll] = useState(0);
    const [averageADRAll, setAverageADRAll] = useState(0);
    const [averageKASTAll, setAverageKASTAll] = useState(0);
    const [averageHSAll, setAverageHSAll] = useState(0);
    const [averageACS, setAverageACS] = useState(0);
    const [averageADR, setAverageADR] = useState(0);
    const [averageKAST, setAverageKAST] = useState(0);
    const [averageHS, setAverageHS] = useState(0);
    const [FirstKill, setFK] = useState(0);
    const [Multikill, setMK] = useState(0);
    const [error, setError] = useState(null);
    const [win, setWin] = useState(0);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findmatchid', {
                    ign: currentUser.riotID,
                });
                const matches = response.data;
                console.log(matches)
                const stats = matches.reduce((total, match) => {
                    const players = [...match.infoTeamleft, ...match.infoTeamright]
                        .filter(player => player.IGN === currentUser.riotID);

                    const kills = players.reduce((sum, player) => sum + parseInt(player.K, 10), 0);
                    const deaths = players.reduce((sum, player) => sum + parseInt(player.D, 10), 0);
                    const assists = players.reduce((sum, player) => sum + parseInt(player.A, 10), 0);
                    const acsSum = players.reduce((sum, player) => sum + parseFloat(player.ACS), 0);
                    const kastSum = players.reduce((sum, player) => sum + parseFloat(player.KAST), 0);
                    const hsSum = players.reduce((sum, player) => sum + parseFloat(player.HS), 0);
                    const adrSum = players.reduce((sum, player) => sum + parseFloat(player.ADR), 0);
                    const fkSum = players.reduce((sum, player) => sum + parseFloat(player.FK), 0);
                    const mkSum = players.reduce((sum, player) => sum + parseFloat(player.MK), 0);

                    const win = total.win + (
                        (match.infoTeamleft.some(player => player.IGN === currentUser.riotID) && match.scoreteamleft > match.scoreteamright) ||
                            (match.infoTeamright.some(player => player.IGN === currentUser.riotID) && match.scoreteamright > match.scoreteamleft) ? 1 : 0
                    );

                    return {
                        kills: total.kills + kills,
                        deaths: total.deaths + deaths,
                        assists: total.assists + assists,
                        acsSum: total.acsSum + acsSum,
                        kastSum: total.kastSum + kastSum,
                        hsSum: total.hsSum + hsSum,
                        adrSum: total.adrSum + adrSum,
                        playerCount: total.playerCount + players.length,
                        fkSum: total.fkSum + fkSum,
                        mkSum: total.mkSum + mkSum,
                        win
                    };
                }, { kills: 0, deaths: 0, assists: 0, acsSum: 0, playerCount: 0, kastSum: 0, hsSum: 0, adrSum: 0, fkSum: 0, mkSum: 0, win: 0 });

                setKDA(stats.deaths > 0 ? (stats.kills + stats.assists) / stats.deaths : stats.kills + stats.assists);
                setTotalKills(stats.kills);
                setTotalDeaths(stats.deaths);
                setTotalAssists(stats.assists);
                setAverageACS(stats.playerCount > 0 ? stats.acsSum / stats.playerCount : 0);
                setAverageKAST(stats.playerCount > 0 ? stats.kastSum / stats.playerCount : 0);
                setAverageHS(stats.playerCount > 0 ? stats.hsSum / stats.playerCount : 0);
                setAverageADR(stats.playerCount > 0 ? stats.adrSum / stats.playerCount : 0);
                setFK(stats.fkSum);
                setMK(stats.mkSum);
                setCountMatch(stats.playerCount);
                setWin(stats.playerCount > 0 ? stats.win * 100 / stats.playerCount : 0);
                setTeam(matches);
            } catch (err) {
                console.error("Error occurred:", err);
                setError(err);
            }
        };

        const fetchAllMatches = async () => {
            try {
                const response = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findallmatch');
                const matches = response.data;
                
                const stats = matches.reduce((total, match) => {
                    const players = [...match.infoTeamleft, ...match.infoTeamright];

                    const kills = players.reduce((sum, player) => sum + parseInt(player.K, 10), 0);
                    const deaths = players.reduce((sum, player) => sum + parseInt(player.D, 10), 0);
                    const assists = players.reduce((sum, player) => sum + parseInt(player.A, 10), 0);
                    const acsSum = players.reduce((sum, player) => sum + parseFloat(player.ACS), 0);
                    const adrSum = players.reduce((sum, player) => sum + parseFloat(player.ADR), 0);
                    const hsSum = players.reduce((sum, player) => sum + parseFloat(player.HS), 0);
                    const kastSum = players.reduce((sum, player) => sum + parseFloat(player.KAST), 0);
                    return {
                        kills: total.kills + kills,
                        deaths: total.deaths + deaths,
                        assists: total.assists + assists,
                        acsSum: total.acsSum + acsSum,
                        adrSum: total.adrSum + adrSum,
                        hsSum: total.hsSum + hsSum,
                        kastSum: total.kastSum + kastSum,
                        playerCount: total.playerCount + players.length,
                    };
                }, { kills: 0, deaths: 0, assists: 0, acsSum: 0, adrSum: 0, playerCount: 0, hsSum: 0, kastSum: 0 });

                setKDAAll(stats.deaths > 0 ? (stats.kills + stats.assists) / stats.deaths : stats.kills + stats.assists);
                setAverageACSAll(stats.playerCount > 0 ? stats.acsSum / stats.playerCount : 0);
                setAverageADRAll(stats.playerCount > 0 ? stats.adrSum / stats.playerCount : 0);
                setAverageHSAll(stats.playerCount > 0 ? stats.hsSum / stats.playerCount : 0);
                setAverageKASTAll(stats.playerCount > 0 ? stats.kastSum / stats.playerCount : 0);
            } catch (err) {
                console.error("Error occurred:", err);
                setError(err);
            }
        };

        fetchAllMatches();
        fetchMatches();
    }, [currentUser.riotID]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!team) {
        return <div>Loading...</div>;
    }

    const data = {
        KDA: KDA.toFixed(1),
        averageHS: averageHS.toFixed(1),
        averageADR: averageADR.toFixed(1),
        averageACS: averageACS.toFixed(1),
        averageKAST: averageKAST.toFixed(1),
        KDAAll: KDAAll.toFixed(1),
        averageHSAll: averageHSAll.toFixed(1),
        averageADRAll: averageADRAll.toFixed(1),
        averageACSAll: averageACSAll.toFixed(1),
        averageKASTAll: averageKASTAll.toFixed(1)
    };

    return (
        <>
            <div className='my-stat'>
                <div className='upper'>
                    <div className='info-me'>

                        <img style={{ width: '100px', borderRadius: "50%", margin: "20px 0" }} src={`https://drive.google.com/thumbnail?id=${currentUser.profilePicture}`} alt="Profile" />
                        <p>{currentUser.username}</p>
                        <p>RiotID: {currentUser.riotID}</p>
                        <TeamInfo />
                    </div>
                    <div className='main'>
                        {[
                            { title: 'Played', data: countMatch },
                            { title: 'Win %', data: win.toFixed(1) },
                            { title: 'ACS', data: averageACS.toFixed(1) },
                            { title: 'Kill', data: totalKills },
                            { title: 'Death', data: totalDeaths },
                            { title: 'Assist', data: totalAssists },
                            { title: 'KDA', data: KDA.toFixed(1) },
                            { title: 'Headshot %', data: averageHS.toFixed(1) },
                            { title: 'ADR', data: averageADR.toFixed(1) },
                            { title: 'KAST %', data: averageKAST.toFixed(1) },
                            { title: 'First Blood', data: FirstKill },
                            { title: 'Multi Kill', data: Multikill },
                        ].map((stat, index) => (
                            <div key={index} className={`${stat.title.replace(' ', '').toLowerCase()} info-data`}>
                                <span className='title'>{stat.title}</span>
                                <span className='data'>{stat.data}</span>
                            </div>
                        ))}
                    </div>

                </div>
                <div className='lower'>
                    <div className='stat-graph'>
                        <div className='radar-chart'>
                            <RadarChart data={data} />
                        </div>
                    </div>
                    <div className='match-history'>
                        <section className='title-match-history'>
                        <span >Lịch sử đấu</span>
                        </section>
                        <MatchHistory />
                    </div>
                </div>

            </div>
        </>
    );
}
