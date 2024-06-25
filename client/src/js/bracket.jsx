let SHEET_ID = '1QggU0zafsVUpV7f-YDYHg5jAfxKAMWZgk57JZSvCVuU';
let SHEET_TITLE = 'Bracket';
let SHEET_RANGE_A_1 = 'A1:L8';

let FULL_URL_A = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE_A_1}`;

fetch(FULL_URL_A)
  .then((res) => res.text())
  .then((data) => {
    // Parse the response data
    let jsonData = JSON.parse(data.substring(47).slice(0, -2));

    // Extract values from the response
    //Logo round 16
    let valueA = [
      jsonData.table.rows[0]?.c[0]?.v ?? null,
      jsonData.table.rows[1]?.c[0]?.v ?? null,
      jsonData.table.rows[2]?.c[0]?.v ?? null,
      jsonData.table.rows[3]?.c[0]?.v ?? null,
      jsonData.table.rows[4]?.c[0]?.v ?? null,
      jsonData.table.rows[5]?.c[0]?.v ?? null,
      jsonData.table.rows[6]?.c[0]?.v ?? null,
      jsonData.table.rows[7]?.c[0]?.v ?? null

    ];
    //score quarter-final
    let valueB = [
      jsonData.table.rows[0]?.c[1]?.v ?? null,
      jsonData.table.rows[1]?.c[1]?.v ?? null,
      jsonData.table.rows[2]?.c[1]?.v ?? null,
      jsonData.table.rows[3]?.c[1]?.v ?? null,
      jsonData.table.rows[4]?.c[1]?.v ?? null,
      jsonData.table.rows[5]?.c[1]?.v ?? null,
      jsonData.table.rows[6]?.c[1]?.v ?? null,
      jsonData.table.rows[7]?.c[1]?.v ?? null

    ];
    //semi team
    let valueC = [
      jsonData.table.rows[0]?.c[2]?.v ?? null,
      jsonData.table.rows[1]?.c[2]?.v ?? null,
      jsonData.table.rows[2]?.c[2]?.v ?? null,
      jsonData.table.rows[3]?.c[2]?.v ?? null,
      jsonData.table.rows[4]?.c[2]?.v ?? null,
      jsonData.table.rows[5]?.c[2]?.v ?? null,
      jsonData.table.rows[6]?.c[2]?.v ?? null,
      jsonData.table.rows[7]?.c[2]?.v ?? null
    ];
    for (let i = 0; i < 8; i++) {
      let teamImageElement = document.getElementById("teamQuater" + (i + 1));
      let teamname = document.getElementById("team-quarter-" + (i + 1));
      let score_round_8 = document.getElementById("quarter-score-" + (i + 1));
      score_round_8.textContent = valueC[i];
      teamImageElement.src = valueA[i];
      teamname.textContent = valueB[i];
    }

    //Check if score1 is greater than score2

    var participantQuater1 = document.querySelector('.bracket .round .winners > div.matchups .matchup .participants .participant #quarter-score-1').parentNode;
    var participantQuater2 = document.querySelector('.bracket .round .winners > div.matchups .matchup .participants .participant #quarter-score-2').parentNode;
    var participantQuater3 = document.querySelector('.bracket .round .winners > div.matchups .matchup .participants .participant #quarter-score-3').parentNode;
    var participantQuater4 = document.querySelector('.bracket .round .winners > div.matchups .matchup .participants .participant #quarter-score-4').parentNode;
    var participantQuater5 = document.querySelector('.bracket .round .winners > div.matchups .matchup .participants .participant #quarter-score-5').parentNode;
    var participantQuater6 = document.querySelector('.bracket .round .winners > div.matchups .matchup .participants .participant #quarter-score-6').parentNode;
    var participantQuater7 = document.querySelector('.bracket .round .winners > div.matchups .matchup .participants .participant #quarter-score-7').parentNode;
    var participantQuater8 = document.querySelector('.bracket .round .winners > div.matchups .matchup .participants .participant #quarter-score-8').parentNode;

    if (valueC[0] == 2) {
      // Add the 'winner' class to the first div.participant
      participantQuater1.classList.add('winner');
      participantQuater2.classList.add('loser');
    } else if(valueC[1] == 2) {
      // Add the 'winner' class to the second div.participant
      participantQuater2.classList.add('winner');
      participantQuater1.classList.add('loser');
    }
    if (valueC[2] == 2) {
      // Add the 'winner' class to the first div.participant
      participantQuater3.classList.add('winner');
      participantQuater4.classList.add('loser');
    } else if(valueC[3] == 2) {
      // Add the 'winner' class to the second div.participant
      participantQuater4.classList.add('winner');
      participantQuater3.classList.add('loser');
    }
    if (valueC[4] == 2) {
      // Add the 'winner' class to the first div.participant
      participantQuater5.classList.add('winner');
      participantQuater6.classList.add('loser');
    } else if(valueC[5] == 2) {
      // Add the 'winner' class to the second div.participant
      participantQuater6.classList.add('winner');
      participantQuater5.classList.add('loser');
    }
    if (valueC[6] == 2) {
      // Add the 'winner' class to the first div.participant
      participantQuater7.classList.add('winner');
      participantQuater8.classList.add('loser');
    } else if(valueC[7] == 2) {
      // Add the 'winner' class to the second div.participant
      participantQuater7.classList.add('loser');
      participantQuater8.classList.add('winner');
    }
    let valueD = [
      jsonData.table.rows[0]?.c[3]?.v ?? null,
      jsonData.table.rows[2]?.c[3]?.v ?? null,
      jsonData.table.rows[4]?.c[3]?.v ?? null,
      jsonData.table.rows[6]?.c[3]?.v ?? null,

    ];
    //score quarter-final
    let valueE = [
      jsonData.table.rows[0]?.c[4]?.v ?? null,
      jsonData.table.rows[2]?.c[4]?.v ?? null,
      jsonData.table.rows[4]?.c[4]?.v ?? null,
      jsonData.table.rows[6]?.c[4]?.v ?? null,

    ];
    //semi team
    let valueF = [
      jsonData.table.rows[0]?.c[5]?.v ?? null,
      jsonData.table.rows[2]?.c[5]?.v ?? null,
      jsonData.table.rows[4]?.c[5]?.v ?? null,
      jsonData.table.rows[6]?.c[5]?.v ?? null,
    ];

    for (let i = 0; i < 4; i++) {
      let teamImageElement = document.getElementById("teamSemi" + (i + 1));
      let teamname = document.getElementById("semi-team-" + (i + 1));
      let score_round_8 = document.getElementById("semi-score-" + (i + 1));
      score_round_8.textContent = valueF[i];
      teamImageElement.src = valueD[i];
      teamname.textContent = valueE[i];
    }

    var participantSemi1 = document.querySelector('.bracket .round .winners > div.matchups .matchup .participants .participant #semi-team-1').parentNode;
    var participantSemi2 = document.querySelector('.bracket .round .winners > div.matchups .matchup .participants .participant #semi-team-2').parentNode;
    var participantSemi3 = document.querySelector('.bracket .round .winners > div.matchups .matchup .participants .participant #semi-team-3').parentNode;
    var participantSemi4 = document.querySelector('.bracket .round .winners > div.matchups .matchup .participants .participant #semi-team-4').parentNode;
    if (valueF[0] == 2) {
      // Add the 'winner' class to the first div.participant
      participantSemi1.classList.add('winner');
      participantSemi2.classList.add('loser');
    } else if(valueF[1] == 2) {
      // Add the 'winner' class to the second div.participant
      participantSemi2.classList.add('winner');
      participantSemi1.classList.add('loser');
    }
    if (valueF[2] == 2) {
      // Add the 'winner' class to the first div.participant
      participantSemi3.classList.add('winner');
      participantSemi4.classList.add('loser');
    } else if(valueF[3] == 2) {
      // Add the 'winner' class to the second div.participant
      participantSemi4.classList.add('winner');
      participantSemi3.classList.add('loser');
    }
    let valueG = [
      jsonData.table.rows[0]?.c[6]?.v ?? null,
      jsonData.table.rows[4]?.c[6]?.v ?? null,
    ];
    //score quarter-final
    let valueH = [
      jsonData.table.rows[0]?.c[7]?.v ?? null,
      jsonData.table.rows[4]?.c[7]?.v ?? null,

    ];
    //semi team
    let valueI = [
      jsonData.table.rows[0]?.c[8]?.v ?? null,
      jsonData.table.rows[4]?.c[8]?.v ?? null,
    ];
    for (let i = 0; i < 2; i++) {
      let teamImageElement = document.getElementById("teamfinal" + (i + 1));
      let teamname = document.getElementById("teamfinal-" + (i + 1));
      let score_round_8 = document.getElementById("score-final-" + (i + 1));
      score_round_8.textContent = valueI[i];
      teamImageElement.src = valueG[i];
      teamname.textContent = valueH[i];
    }
    var participantSemi1 = document.querySelector('.bracket .round .winners > div.matchups .matchup .participants .participant #teamfinal-1').parentNode;
    var participantSemi2 = document.querySelector('.bracket .round .winners > div.matchups .matchup .participants .participant #teamfinal-2').parentNode;
    if (valueI[0] == 2) {
      // Add the 'winner' class to the first div.participant
      participantSemi1.classList.add('winner');
      participantSemi2.classList.add('loser');
    } else if(valueI[1] == 2) {
      // Add the 'winner' class to the second div.participant
      participantSemi2.classList.add('winner');
      participantSemi1.classList.add('loser');
    }
    let groupJ = [
      jsonData.table.rows[0]?.c[9]?.v ?? null
    ]
    let groupK = [
      jsonData.table.rows[0]?.c[10]?.v ?? null
    ]
    let groupL = [
      jsonData.table.rows[0]?.c[11]?.v ?? null
    ]
    let teamImageElementgrandFinal1 = document.getElementById("advance-grandFinal-team-1");
    let teamnamegrandFinal1 = document.getElementById("teamgrandFinal-1");
    let score_grand_final_1 = document.getElementById("score-grandFinal-1");
    teamImageElementgrandFinal1.src = groupJ[0];
    teamnamegrandFinal1.textContent = groupK[0];
    score_grand_final_1.textContent = groupL[0];
    var grandFinalteam1 = document.querySelector('.round .winners > div.matchups .matchup .participants .participant #score-grandFinal-1').parentNode;
    if (groupL[0] == 3){
      grandFinalteam1.classList.add('winner');
    }
  })

