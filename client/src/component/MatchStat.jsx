import React, { useState, useEffect } from 'react';

const renderPlayerStats = (players, teamName, logoURL) => {
    const imagesagent = import.meta.glob('../agent/*.{png,jpg,jpeg,gif}');
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
    }, []);

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
                        <th className='hidden'>FK</th>
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
                                        <span>Image not available</span>
                                    )}
                                    <span>{player.IGN}</span>
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
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const PlayerStats = ({ selectedMap, matchinfo }) => {
    if (!selectedMap || !matchinfo || matchinfo.length === 0) return null;

    return (
        <>

        <div className="player-stats-container">
                {renderPlayerStats(selectedMap.infoTeamleft.data, matchinfo[0].teamleft.teamname, matchinfo[0].teamleft.logoURL)}
                {renderPlayerStats(selectedMap.infoTeamright.data, matchinfo[0].teamright.teamname, matchinfo[0].teamright.logoURL)}
        </div>
        </>
    );
};

export default PlayerStats;
