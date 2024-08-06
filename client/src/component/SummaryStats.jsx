import React, { useState, useEffect } from 'react';

const renderSummaryStats = (players, teamName, logoURL) => {
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

    const calculateAverages = (player) => {
        const averageACS = player.ACS.toFixed(1);
        const averageADR = player.ADR.toFixed(1);
        const averageHS = player.HS.toFixed(1);
        const averageKAST = player.KAST.toFixed(1);
        const averageKD = (player.K / player.D).toFixed(2);
        return { averageACS, averageADR, averageHS, averageKAST, averageKD };
    };

    if (!players) return null;

    return (
        <div className='wrapper'>
            <table className="summary-stats-table">
                <thead className='all-title'>
                    <tr>
                        <th>
                            <div className='teamname'>
                                <img src={`https://drive.google.com/thumbnail?id=${logoURL}`} alt={`${teamName} Logo`} />
                                {teamName}
                            </div>
                        </th>
                        <th>ACS (avg)</th>
                        <th>K</th>
                        <th>D</th>
                        <th>A</th>
                        <th>ADR (avg)</th>
                        <th>HS (avg)</th>
                        <th>KAST (avg)</th>
                        <th>K/D (avg)</th>
                        <th>FB</th>
                        <th>MK</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => {
                        const { averageACS, averageADR, averageHS, averageKAST, averageKD } = calculateAverages(player);
                        return (
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
                                <td className='all-title'>{averageACS}</td>
                                <td className='all-title'>{String(player.K)}</td>
                                <td className='all-title'>{String(player.D)}</td>
                                <td className='all-title'>{String(player.A)}</td>
                                <td className='all-title'>{averageADR}</td>
                                <td className='all-title'>{averageHS}%</td>
                                <td className='all-title'>{averageKAST}%</td>
                                <td className='all-title'>{averageKD}</td>
                                <td className='all-title'>{String(player.FK)}</td>
                                <td className='all-title'>{String(player.MK)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default renderSummaryStats;
