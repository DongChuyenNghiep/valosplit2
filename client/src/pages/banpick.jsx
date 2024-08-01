import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/BanPick.css'; // CSS for styling
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const maps = [
    { name: 'Ascent', image: 'Ascent.jpg' },
    { name: 'Bind', image: 'Bind.jpg' },
    { name: 'Haven', image: 'Haven.jpg' },
    { name: 'Icebox', image: 'Icebox.jpg' },
    { name: 'Sunset', image: 'Sunset.jpg' },
    { name: 'Lotus', image: 'Lotus.jpg' },
    { name: 'Split', image: 'Split.jpg' },
];

const MatchTypeSelector = ({ onSelect }) => {
    const handleChange = (event) => {
        onSelect(event.target.value);
    };

    return (
        <div className="match-type-selector">
            <h2>Select Match Type</h2>
            <select onChange={handleChange}>
                <option value="BO1">BO1</option>
                <option value="BO3">BO3</option>
                <option value="BO5">BO5</option>
            </select>
        </div>
    );
};

const BanPick = () => {
    const images = import.meta.glob('../image/*.{png,jpg,jpeg,gif}');
    const [imageUrls, setImageUrls] = useState({});
    const [banPicks, setBanPicks] = useState([]);
    const [currentAction, setCurrentAction] = useState('ban'); // 'ban' or 'pick'
    const [actionCount, setActionCount] = useState(0); // Total actions made
    const [matchType, setMatchType] = useState('BO1'); // Default to BO1
    const { currentUser, loading } = useSelector((state) => state.user);
    const [matchInfo, setMatchInfo] = useState(null);
    const { stage,matchid } = useParams();
    const [sideSelection, setSideSelection] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findmatchid', { idmatch: matchid,stage:stage });
                setMatchInfo(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMatches();
    }, [matchid]);

    useEffect(() => {
        const loadImages = async () => {
            const urls = {};
            for (const path in images) {
                try {
                    const mod = await images[path]();
                    urls[path.split('/').pop()] = mod.default;
                } catch (error) {
                    console.error(`Error loading image at ${path}:`, error);
                }
            }
            setImageUrls(urls);
        };
        loadImages();
    }, []);

    const determinePhase = () => {
        switch (matchType) {
            case 'BO1':
                if (actionCount < 6) return 'ban';
                return 'decider';
            case 'BO3':
                if (actionCount < 1) return 'ban';
                if (actionCount < 3) return 'pick';
                if (actionCount < 6) return 'ban';
                return 'decider';
            case 'BO5':
                if (actionCount < 1) return 'ban';
                if (actionCount < 6) return 'pick';
                return 'decider';
            default:
                return 'ban';
        }
    };

    const [currentTeam, setCurrentTeam] = useState(null);
    const [teamname, setTeamName] = useState(null);
    useEffect(() => {
        if (matchInfo && matchInfo.length > 0) {
            setCurrentTeam(matchInfo[0].teamleft.logoURL);
            setTeamName(matchInfo[0].teamleft.teamname);
        }
    }, [matchInfo]);

    const handleMapClick = (map) => {
        if (!currentTeam) {
            console.error("Team information not loaded yet");
            return;
        }

        const phase = determinePhase();
        if (phase === 'decider') return; // No action if decider phase reached

        const newBanPick = {
            map: map.name,
            type: currentAction,
            index: actionCount,
            image: map.image || '', // Include the image URL
            team: currentTeam,
            teamname: teamname
        };

        setBanPicks([...banPicks, newBanPick]);
        setActionCount(actionCount + 1);
        setCurrentAction(phase === 'ban' ? 'ban' : 'pick'); // Update phase after action

        // Alternate the team
        if (matchInfo && matchInfo.length > 0) {
            setCurrentTeam(currentTeam === matchInfo[0].teamleft.logoURL ? matchInfo[0].teamright.logoURL : matchInfo[0].teamleft.logoURL);
            setTeamName(teamname === matchInfo[0].teamleft.teamname ? matchInfo[0].teamright.teamname : matchInfo[0].teamleft.teamname);
        }
    };

    useEffect(() => {
        const maxActions = matchType === 'BO1' ? 6 : matchType === 'BO3' ? 6 : 6;
        if (actionCount === maxActions && matchInfo) {
            const remainingMap = maps.find(m => !banPicks.some(bp => bp.map === m.name));
            if (remainingMap) {
                const deciderPick = {
                    map: remainingMap.name,
                    type: 'decider',
                    index: maxActions,
                    image: remainingMap.image || '',
                    team: '', // No team assigned for decider map
                    teamname: ''
                };
                const updatedBanPicks = [...banPicks, deciderPick];
                setBanPicks(updatedBanPicks);
                setActionCount(maxActions); // Update the action count to finalize the picks

                const data = {
                    id: matchid,
                    group:stage, // Assign the match ID here
                    veto: updatedBanPicks // Include the list of ban/pick actions
                };

                axios.post('https://valosplit2-backend.vercel.app/api/auth/banpick', data)
                    .then(response => {
                        console.log('Ban/Pick actions saved successfully:', response.data);
                        if (matchType !== 'BO1') {
                            // No side selection needed for BO1
                            const picksForSideSelection = updatedBanPicks.filter(pick => pick.type === 'pick');
                            setSideSelection(picksForSideSelection);
                        }
                    })
                    .catch(error => console.error(error.response ? error.response.data : error.message));
            }
        }
    }, [actionCount, banPicks, imageUrls, matchInfo, matchType, matchid]);

    const handleSideSelect = (map, side) => {
        const updatedBanPicks = banPicks.map(pick => {
            if (pick.map === map) {
                // Set the side for the opposite team
                const oppositeSide = side === 'attacker' ? 'defender' : 'attacker';
                return { ...pick, side: oppositeSide };
            }
            return pick;
        });

        setBanPicks(updatedBanPicks);
        const remainingSideSelections = sideSelection.filter(pick => pick.map !== map);
        setSideSelection(remainingSideSelections);

        const data = {
            id: matchid,
            group:stage,
            veto: updatedBanPicks
        };

        axios.post('https://valosplit2-backend.vercel.app/api/auth/banpick', data)
            .then(response => {
                console.log('Side selection saved successfully:', response.data);
            })
            .catch(error => console.error(error.response ? error.response.data : error.message));
    };

    if (loading || !matchInfo) {
        return <div>Loading...</div>; // Add loading state handling
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <MatchTypeSelector onSelect={setMatchType} />
            <h1>Ban/Pick Management</h1>
            <div className="banpick-container">
                {maps.map((m) => (
                    <div 
                        key={m.name} 
                        className={`map-item ${banPicks.find(bp => bp.map === m.name) ? 'disabled' : ''}`} 
                        onClick={() => !banPicks.find(bp => bp.map === m.name) && handleMapClick(m)}
                    >
                        <img 
                            src={imageUrls[m.image] || ''} 
                            alt={m.name} 
                            className="map-image" 
                        />
                        <div className="map-name">{m.name}</div>
                    </div>
                ))}
            </div>
            <ul>
                {banPicks.map((banPick, index) => {
                    const isPick = banPick.type === 'pick';
                    if (banPick.type==="decider"){
                        return (
                    <li key={index}>
                                Map <strong>{banPick.map}</strong> will be <strong>{banPick.type.toUpperCase()}</strong>
                    </li>
                        );
                    }
                    return (
                        <li key={index}>
                            Team {banPick.teamname} <strong>{banPick.type.toUpperCase()}</strong> {banPick.map}
                            {isPick && banPick.side && ` - ${banPick.teamname} Side: ${banPick.side.toUpperCase()}`}
                        </li>
                    );
                })}
            </ul>
            {sideSelection.length > 0 && (
                <div className="side-selection">
                    <h2>Select Side for {sideSelection[0].map}</h2>
                    <button onClick={() => handleSideSelect(sideSelection[0].map, 'attacker')}>Attacker</button>
                    <button onClick={() => handleSideSelect(sideSelection[0].map, 'defender')}>Defender</button>
                </div>
            )}
        </div>
    );
};

export default BanPick;
