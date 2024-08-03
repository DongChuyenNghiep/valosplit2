import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../css/matchinfo.css';
import BanPickHistory from '../component/banpickhistory';
import ScoreMap from '../component/ScoreMap.jsx'
import PlayerStats from '../component/MatchStat.jsx';
import '../css/Matchstat.css'

export default function StatSpecificMatch() {
    const images = import.meta.glob('../image/*.{png,jpg,jpeg,gif}');
    const { stage, matchid } = useParams();

    const [error, setError] = useState(null);
    const [matchinfo, setMatchInfo] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [maps, setMaps] = useState([]);
    const [selectedMapIndex, setSelectedMapIndex] = useState(0);
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findmatchid', {
                    idmatch: matchid,
                    stage: stage,
                });
                setMatchInfo(response.data);
                if (response.data.length > 0) {
                    setMaps(response.data[0].maps);
                }
            } catch (err) {
                setError(err);
            }
        };

        fetchMatches();
    }, [matchid]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const loadImageUrls = async () => {
            const urls = {};
            for (const [path, resolver] of Object.entries(images)) {
                const mapName = path.split('/').pop().split('.')[0];
                try {
                    const module = await resolver();
                    urls[mapName] = module.default;
                } catch (error) {
                    console.error(`Failed to load image at ${path}`, error);
                }
            }
            setImageUrls(urls);
        };

        loadImageUrls();
    }, [images]);

    const currentTimeISO = currentTime.toISOString();

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);

        const offset = 7 * 60;
        const localDate = new Date(date.getTime() + offset * 60 * 1000);

        const hour = localDate.getUTCHours().toString().padStart(2, '0');
        const minute = localDate.getUTCMinutes().toString().padStart(2, '0');
        const day = localDate.getUTCDate().toString().padStart(2, '0');
        const month = localDate.toLocaleString('default', { month: 'short' }).toUpperCase();
        const year = localDate.getUTCFullYear();
        const getDaySuffix = (day) => {
            if (day >= 11 && day <= 13) return 'TH';
            switch (day % 10) {
                case 1: return 'ST';
                case 2: return 'ND';
                case 3: return 'RD';
                default: return 'TH';
            }
        };

        const daySuffix = getDaySuffix(day);
        return <>{hour}:{minute} - {day}{daySuffix} {month} {year}</>;
    };

    const TimeComparison = () => {
        if (!matchinfo || !matchinfo[0].timestartmatch) return "TBD";

        const formattedDate = formatDate(matchinfo[0].timestartmatch);

        if (currentTimeISO < new Date(matchinfo[0].timestartmatch).toISOString()) {
            return <span>{formattedDate}</span>;
        } else {
            return (
                <>
                    <span className='status'>Kết thúc</span>
                    <span className='time'>{formattedDate}</span>
                </>
            );
        }
    };

    const handleMapChange = (index) => {
        setSelectedMapIndex(index);
    };

    const selectedMap = selectedMapIndex !== null ? maps[selectedMapIndex] : null;

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!matchinfo) {
        return <div className='container1'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>;
    }

    return (
        <>
            <div className='matchstat'>
                <div className='scoreboard-title'>
                    <div className='scoreboard'>
                        <div className='team teamleft'>
                            <div className="logo">
                                <img src={"https://drive.google.com/thumbnail?id=" + matchinfo[0].teamleft.logoURL} alt="Team A Logo" />
                            </div>
                            <div className="teamname">{matchinfo[0].teamleft.teamname}</div>
                        </div>
                        <div className='score-and-time'>
                            <div className='score'>
                                <span className={`scoreA ${matchinfo[0].scoreteamA > matchinfo[0].scoreteamB ? 'green-win' : 'red-lose'}`} id='score-left'>
                                    {matchinfo[0].scoreteamA}
                                </span>
                            </div>
                            <div className='time'>
                                {TimeComparison()}
                            </div>
                            <div className='score'>
                                <span className={`scoreB ${matchinfo[0].scoreteamB > matchinfo[0].scoreteamA ? 'green-win' : 'red-lose'}`} id='score-right'>
                                    {matchinfo[0].scoreteamB}
                                </span>
                            </div>
                        </div>
                        <div className='team teamright'>
                            <div className="logo">
                                <img src={"https://drive.google.com/thumbnail?id=" + matchinfo[0].teamright.logoURL} alt="Team B Logo" />
                            </div>
                            <div className="teamname">{matchinfo[0].teamright.teamname}</div>
                        </div>
                    </div>
                    <div className='title'>
                        <span className='league all-title'>{matchinfo[0].league}</span>
                        <span className='group all-title'>{matchinfo[0].group} ● {matchinfo[0].type} </span>
                    </div>
                </div>
                <div className='score-and-map'>
                    <ScoreMap maps={maps} matchinfo={matchinfo} imageUrls={imageUrls} />

                    <div className='ban-pick-history'>
                        <BanPickHistory />
                    </div>
                </div>
                <div className='map-buttons'>
                <span className='all-title' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>Match stats</span>
                <div className='button-map'>
                    {maps.map((map, index) => (
                        <a
                            key={index}
                            onClick={() => handleMapChange(index)}
                            className={index === selectedMapIndex ? 'active' : ''}
                        >
                            {map.name}
                        </a>
                    ))}
                </div>
                </div>
                <PlayerStats selectedMap={selectedMap} matchinfo={matchinfo} />
            </div>
        </>
    );
}
