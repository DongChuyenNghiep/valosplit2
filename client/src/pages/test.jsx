import { useState } from 'react';

export default function Test() {
    const [matchInfo, setMatchInfo] = useState(null);
    const [maps, setMaps] = useState([]);
    const [error, setError] = useState(null);
    const matchid = '123e456wdw7-e89b-12d3-a456-426614174000';

    const fetchMatches = async () => {
        const url = `https://api.henrikdev.xyz/valorant/v2/match/${matchid}`;
        console.log('Fetching data from URL:', url);

        try {
            const response = await fetch(url, {
                headers: {
                    'ApiKeyAuth': '123e456wdw7-e89b-12d3-a456-426614174000', // Replace with your actual API key
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            setMatchInfo(data);

            if (data.maps && data.maps.length > 0) {
                setMaps(data.maps);
            }

        } catch (err) {
            console.error('Error fetching matches:', err);
            setError(err.message);
        }
    };

    return (
        <div>
            <button style={{marginTop:"200px"}} onClick={fetchMatches}>Fetch Matches</button>
            {error && <p>Error: {error}</p>}
            {matchInfo && <pre>{JSON.stringify(matchInfo, null, 2)}</pre>}
            {maps.length > 0 && (
                <div>
                    <h3>Maps:</h3>
                    <ul>
                        {maps.map((map, index) => (
                            <li key={index}>{map}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
