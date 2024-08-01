import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/matchinfo.css';

export default function BanPickHistory() {
    const images = import.meta.glob('../image/*.{png,jpg,jpeg,gif}');
    const {stage, matchid } = useParams();
    const [error, setError] = useState(null);
    const [banpicks, setBanPick] = useState(null);
    const [imageUrls, setImageUrls] = useState({});
    
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.post('https://valosplit2-backend.vercel.app/api/auth/findbanpick', {
                    id: matchid,
                    group:stage
                });
                setBanPick(response.data);
            } catch (err) {
                setError(err);
            }
        };

        fetchMatches();
    }, [matchid]);

    useEffect(() => {
        const loadImageUrls = async () => {
            const urls = {};
            const imagePromises = Object.entries(images).map(async ([path, resolver]) => {
                const mapName = path.split('/').pop().split('.')[0]; // Extract map name from path
                try {
                    const module = await resolver(); // Resolve the image module
                    urls[mapName] = module.default; // Store the default export (image URL) in the urls object
                } catch (error) {
                    console.error(`Failed to load image at ${path}`, error);
                }
            });

            // Wait for all image promises to resolve
            await Promise.all(imagePromises);
            setImageUrls(urls); // Set the state with all loaded image URLs
        };

        loadImageUrls();
    }, [images]);

    if (error) {
        return <div></div>;
    }

    return (
        <>
            {banpicks && banpicks.veto && banpicks.veto.map((banpick, index) => (
                <div
                    key={index}
                    className='banpickmap'
                    style={{
                        background: `url(${imageUrls[banpick.map] || ''}) no-repeat center center`,
                        backgroundSize: 'cover',
                    }}
                >
                    <span className='mapname'>{banpick.map}</span>
                    {banpick.team && banpick.team !== "" && (
                        <img src={"https://drive.google.com/thumbnail?id=" + banpick.team} alt="Team" />
                    )}
                    <span className={banpick.type}>{banpick.type}</span>
                </div>
            ))}
        </>
    );
}
