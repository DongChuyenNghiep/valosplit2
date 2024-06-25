import React, { useEffect } from 'react';
import '../css/all_team.css';
import createBoxes from '../js/all_team.jsx'; // Adjust the path if necessary
import Allteamdata from '../js/allteamdata.jsx';

export default function Allteam() {
    useEffect(() => {
        createBoxes();
        Allteamdata();

    }, []);

    return (
        <div className="all-team">
            <section className="info">
                <h2>CÁC ĐỘI THAM DỰ GIẢI ĐẤU</h2>
            </section>
        </div>
    );
}
