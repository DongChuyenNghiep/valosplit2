// Stat.js
import '../css/chart.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RadarChart from '../Chart.jsx';
import '../css/stat.css';
import MatchHistory from '../matchhistory.jsx';
import Image from '../image/waiting.png'
import { Link } from 'react-router-dom';
export default function Stat() {
    document.title = "Thông số";
    const [team, setTeam] = useState(null);
    const [team1, setTeam1] = useState(null);
    const [countMatch, setCountMatch] = useState(0);
    const [totalKills, setTotalKills] = useState(0);
    const [totalKPM, setTotalKPM] = useState(0);
    const [totalKPMAll, setTotalKPMAll] = useState(0);
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
    const [error1, setError1] = useState(null);
    const [win, setWin] = useState(0);
    const { currentUser, loading } = useSelector(state => state.user);
    if(!currentUser){
        return <><div className='button-stat'>
        <Link to='/valorant/stat' className='active'>My stat</Link>
        <Link to='/valorant/rank'>All Stat</Link>
        </div>
        <div className='container1'><p>Vui lòng <Link to='/valorant/signin'  style={{color:"rgb(245, 158, 52)"}}>đăng nhập</Link> để coi mục này</p></div>
        </>
    }
    useEffect(() => {
        if (loading || !currentUser) {
            // If user data is still loading or not available, don't make the request
            return;
        }

        const fetchTeam = async () => {
            try {
                const response = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findteam', {
                    player: currentUser.riotID, // Use the actual player ID
                });
                setTeam1(response.data);
                
            } catch (err) {
                setError1(err);
                
            }
        };

        fetchTeam();
    }, [currentUser, loading]);
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findmatchid', {
                    ign: currentUser.riotID,
                });
                const matches = response.data;
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
                setTotalKPM(stats.playerCount > 0 ? stats.kills / stats.playerCount : 0);
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
                setKDA(0);
                setTotalKills(0);
                setTotalKPM(0);
                setTotalDeaths(0);
                setTotalAssists(0);
                setAverageACS(0);
                setAverageKAST(0);
                setAverageHS(0);
                setAverageADR(0);
                setFK(0);
                setMK(0);
                setCountMatch(0);
                setWin(0);
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
                setTotalKPMAll(stats.playerCount > 0 ? stats.kills / stats.playerCount : 0);
                setAverageACSAll(stats.playerCount > 0 ? stats.acsSum / stats.playerCount : 0);
                setAverageADRAll(stats.playerCount > 0 ? stats.adrSum / stats.playerCount : 0);
                setAverageHSAll(stats.playerCount > 0 ? stats.hsSum / stats.playerCount : 0);
                setAverageKASTAll(stats.playerCount > 0 ? stats.kastSum / stats.playerCount : 0);
            } catch (err) {
                console.error("Error occurred:", err);
                setKDAAll(0);
                setTotalKPMAll(0);
                setAverageACSAll(0);
                setAverageADRAll(0);
                setAverageHSAll(0);
                setAverageKASTAll(0);
                setError(err);
            }
        };

        fetchAllMatches();
        fetchMatches();
    }, [currentUser.riotID]);
    const data = {
        KDA: KDA.toFixed(1),
        KPM:totalKPM.toFixed(1),
        averageHS: averageHS.toFixed(1),
        averageADR: averageADR.toFixed(1),
        averageACS: averageACS.toFixed(1),
        averageKAST: averageKAST.toFixed(1),
        KDAAll: KDAAll.toFixed(1),
        KPMAll:totalKPMAll.toFixed(1),
        averageHSAll: averageHSAll.toFixed(1),
        averageADRAll: averageADRAll.toFixed(1),
        averageACSAll: averageACSAll.toFixed(1),
        averageKASTAll: averageKASTAll.toFixed(1)
    };
    
    if (error1) {
        return <div className='container1'><img src={Image} width='300px'/><p style={{marginTop:'40px'}}>{currentUser.riotID} chưa đăng kí tên với giải đấu.</p></div>
    }

    if (!team1) {
        return  <><div className='container1' style={{display:'flex',flexDirection:"column"}}><div className='button-stat'>
        <Link to='/valorant/stat' className='active'>My stat</Link>
        <Link to='/valorant/rank'>All Stat</Link>
        </div>
        <div className='container1'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        </div></>
        
    }



        // This will log the team state whenever it changes

    return (
        <>
            <div className='button-stat'>
            <Link to='/valorant/stat' className='active'>My stat</Link>
            <Link to='/valorant/rank'>All Stat</Link>
            </div>
            <div className='my-stat'>
                <div className='upper'>
                    <div className='info-me'>

                        <img style={{  width: '100px',height:"100px", borderRadius: "50%", margin: "20px 0" }} src={`https://drive.google.com/thumbnail?id=${currentUser.profilePicture}`} alt="Profile" />
                        <p>{currentUser.username}</p>
                        <p>RiotID: {currentUser.riotID}</p>
                        <p>Team: {team1.team} ({team1.shortname})</p>
                        <img src={`https://drive.google.com/thumbnail?id=${team1.logoURL}`} style={{ width: "45%", aspectRatio: "1/1" }} />
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
