import React, { useState, useEffect } from 'react';

const useImageUrls = (imagesagent) => {
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const loadImageUrls = async () => {
            const urls = {};
            for (const [path, resolver] of Object.entries(imagesagent)) {
                const agentName = path.split('/').pop().split('.')[0];
                try {
                    const module = await resolver();
                    urls[agentName] = module.default;
                } catch (error) {
                    console.error(`Failed to load image at ${path}`, error);
                }
            }
            setImageUrls(urls);
        };

        loadImageUrls();
    }, [imagesagent]);

    return imageUrls;
};

const renderPlayerStats = (players, teamName, logoURL, imageUrls) => {
    if (!players) return null;

    return (
        <div className='wrapper'>
            <table className="player-stats-table">
                <thead className='all-title'>
                    <tr>
                        <th>
                            <div className='teamname'>
                                <img src={`https://drive.google.com/thumbnail?id=${logoURL}`} alt={`${teamName} Logo`} />
                                {teamName}
                            </div>
                        </th>
                        <th>ACS</th>
                        <th>K</th>
                        <th>D</th>
                        <th>A</th>
                        <th className='hidden'>KD</th>
                        <th>ADR</th>
                        <th>HS</th>
                        <th className=''>KAST</th>
                        <th className='hidden'>FB</th>
                        <th className='hidden'>MK</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <tr key={index}>
                            <td>
                                <div className='teamname'>
                                    {imageUrls[player.Agent] ? (
                                        <img src={imageUrls[player.Agent]} alt={`${player.Agent} Logo`} />
                                    ) : (
                                        <span>Loading...</span>
                                    )}
                                    <span>{player.IGN}</span>
                                </div>
                            </td>
                            <td className='all-title '>{String(player.ACS)}</td>
                            <td className='all-title '>{String(player.K)}</td>
                            <td className='all-title '>{String(player.D)}</td>
                            <td className='all-title '>{String(player.A)}</td>
                            <td className='all-title hidden'>{String(player.KD)}</td>
                            <td className='all-title'>{String(player.ADR)}</td>
                            <td className='all-title'>{String(player.HS)}%</td>
                            <td className=' all-title'>{String(player.KAST)}%</td>
                            <td className='all-title hidden'>{String(player.FK)}</td>
                            <td className='all-title hidden'>{String(player.MK)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const calculateAggregatedPlayerStats = (maps, teamSide) => {
    const playerStats = {};

    maps.forEach(map => {
        const teamData = teamSide === 'left' ? map.infoTeamleft?.data : map.infoTeamright?.data;

        if (!teamData || teamData.length === 0) {
            return;
        }

        teamData.forEach(player => {
            if (!playerStats[player.IGN]) {
                playerStats[player.IGN] = {
                    Agent: player.Agent,
                    ACS: 0,
                    K: 0,
                    D: 0,
                    A: 0,
                    KD: 0,
                    ADR: 0,
                    HS: 0,
                    KAST: 0,
                    FK: 0,
                    MK: 0,
                    games: 0,
                };
            }

            playerStats[player.IGN].ACS += parseFloat(player.ACS) || 0;
            playerStats[player.IGN].K += parseFloat(player.K) || 0;
            playerStats[player.IGN].D += parseFloat(player.D) || 0;
            playerStats[player.IGN].A += parseFloat(player.A) || 0;
            playerStats[player.IGN].ADR += parseFloat(player.ADR) || 0;
            playerStats[player.IGN].HS += parseFloat(player.HS) || 0;
            playerStats[player.IGN].KAST += parseFloat(player.KAST) || 0;
            playerStats[player.IGN].FK += parseFloat(player.FK) || 0;
            playerStats[player.IGN].MK += parseFloat(player.MK) || 0;
            playerStats[player.IGN].games += 1;
        });
    });

    Object.values(playerStats).forEach(player => {
        if (player.games > 0) {
            player.KD = (player.K / player.D).toFixed(1);
            player.HS = (player.HS / player.games).toFixed(0);
            player.KAST = (player.KAST / player.games).toFixed(0);
            player.ACS = (player.ACS / player.games).toFixed(0);
            player.ADR = (player.ADR / player.games).toFixed(1);
        }
    });

    return playerStats;
};

const renderAggregatedPlayerStats = (maps, teamName, logoURL, imageUrls, teamSide) => {
    const playerStats = calculateAggregatedPlayerStats(maps, teamSide);

    return (
        <div className='wrapper'>
            <table className="player-stats-table">
                <thead className='all-title'>
                    <tr>
                        <th>
                            <div className='teamname'>
                                <img src={`https://drive.google.com/thumbnail?id=${logoURL}`} alt={`${teamName} Logo`} />
                                {teamName}
                            </div>
                        </th>
                        <th>ACS</th>
                        <th>K</th>
                        <th>D</th>
                        <th>A</th>
                        <th className='hidden'>KD</th>
                        <th>ADR</th>
                        <th>HS</th>
                        <th className=''>KAST</th>
                        <th className='hidden'>FB</th>
                        <th className='hidden'>MK</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(playerStats).map((IGN, index) => {
                        const player = playerStats[IGN];
                        return (
                            <tr key={index}>
                                <td>
                                    <div className='teamname'>
                                        {imageUrls[player.Agent] ? (
                                            <img src={imageUrls[player.Agent]} alt={`${player.Agent} Logo`} />
                                        ) : (
                                            <span>Loading...</span>
                                        )}
                                        <span>{IGN}</span>
                                    </div>
                                </td>
                                <td className='all-title '>{player.ACS}</td>
                                <td className='all-title '>{player.K}</td>
                                <td className='all-title '>{player.D}</td>
                                <td className='all-title '>{player.A}</td>
                                <td className='all-title hidden'>{player.KD}</td>
                                <td className='all-title'>{player.ADR}</td>
                                <td className='all-title'>{player.HS}%</td>
                                <td className=' all-title'>{player.KAST}%</td>
                                <td className='all-title hidden'>{player.FK}</td>
                                <td className='all-title hidden'>{player.MK}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const PlayerStats = ({ selectedMap, matchinfo }) => {
    const [isLargeScreen, setIsLargeScreen] = useState(true);
    const imagesagent = import.meta.glob('../agent/*.{png,jpg,jpeg,gif}');
    const imageUrls = useImageUrls(imagesagent);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1400);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!selectedMap || !matchinfo || matchinfo.length === 0) {
       
        return null;
    }

    const leftTeamData = selectedMap.infoTeamleft.data;
    const rightTeamData = selectedMap.infoTeamright.data;

    if (!leftTeamData.length && !rightTeamData.length) {
        console.log('No player data available for the selected map');
        return null;
    }

    return (
        <div className="player-stats-container">
            {isLargeScreen ? (
                <>
                    {renderPlayerStats(leftTeamData, matchinfo[0].teamleft.teamname, matchinfo[0].teamleft.logoURL, imageUrls)}
                    {renderPlayerStats(rightTeamData, matchinfo[0].teamright.teamname, matchinfo[0].teamright.logoURL, imageUrls)}
                </>
            ) : (
                <>
                    {renderAggregatedPlayerStats(matchinfo[0].maps, matchinfo[0].teamleft.teamname, matchinfo[0].teamleft.logoURL, imageUrls, 'left')}
                    {renderAggregatedPlayerStats(matchinfo[0].maps, matchinfo[0].teamright.teamname, matchinfo[0].teamright.logoURL, imageUrls, 'right')}
                </>
            )}
        </div>
    );
};

export default PlayerStats;
