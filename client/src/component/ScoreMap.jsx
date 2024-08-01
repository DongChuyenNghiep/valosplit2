import React from 'react';

export default function ScoreMap({ maps, matchinfo, imageUrls }) {
  return (
    <div className='score-map'>
      {maps && maps.map((map, index) => {
        const scoreLeft = map.infoTeamleft?.score;
        const scoreRight = map.infoTeamright?.score;

        // Determine if Team A (left) won
        const isTeamAWin = scoreLeft !== undefined && scoreRight !== undefined ? scoreLeft > scoreRight : null;
        const isDraw = scoreLeft === scoreRight;

        const pickLabel = map.pick === matchinfo[0].teamleft.teamname || map.pick === matchinfo[0].teamright.teamname
          ? <span className='pick'>Pick</span>
          : null;

        return (
          <div
            key={index}
            className='map-details'
            style={{
              background: `linear-gradient(to right, rgb(42, 24, 37), rgba(42, 24, 37, 0.5), rgb(42, 24, 37)), url(${imageUrls[map.name] || ''})`,
            }}
          >
            <div className={`teamleft ${isTeamAWin === true ? 'green-win' : isTeamAWin === false ? 'red-lose' : ''}`} id='score-left-sum'>
              <img src={"https://drive.google.com/thumbnail?id=" + matchinfo[0].teamleft.logoURL} alt="Team A Logo" />
              <span className='score' style={{ fontSize: "15px", color: isDraw ? 'white' : 'inherit' }}>
                {isDraw ? '-' : (scoreLeft !== undefined ? scoreLeft : 'N/A')}
              </span>
              {map.pick === matchinfo[0].teamleft.teamname && pickLabel}
              {isTeamAWin === true && !isDraw && <img style={{ width: "10px", height: "30px", margin: "0 15px" }} src="https://drive.google.com/thumbnail?id=1FcrWdlic5RWZjGCPWgPg9xVuUr4p0Ha3" alt="Winner" className="winner-image" />}
            </div>
            <div className='mapname'>
              <span>{map.name}</span>
            </div>
            <div className={`teamright ${isTeamAWin === false ? 'green-win' : isTeamAWin === true ? 'red-lose' : ''}`} id='score-right-sum'>
              <img src={"https://drive.google.com/thumbnail?id=" + matchinfo[0].teamright.logoURL} alt="Team B Logo" />
              <span className='score' style={{ fontSize: "15px", color: isDraw ? 'white' : 'inherit' }}>
                {isDraw ? '-' : (scoreRight !== undefined ? scoreRight : 'N/A')}
              </span>
              {map.pick === matchinfo[0].teamright.teamname && pickLabel}
              {isTeamAWin === false && !isDraw && <img style={{ width: "10px", height: "30px", margin: "0 15px" }} src="https://drive.google.com/thumbnail?id=1FcrWdlic5RWZjGCPWgPg9xVuUr4p0Ha3" alt="Winner" className="winner-image" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
