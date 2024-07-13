
export default function UpperBracket(){
let SHEET_ID = '1s2Lyk37v-hZcg7-_ag8S1Jq3uaeRR8u-oG0zviSc26E';
let SHEET_TITLE = 'Playoff';
let SHEET_RANGE_A_1 = 'A1:I4';

let FULL_URL_A = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE_A_1}`;

fetch(FULL_URL_A)
  .then((res) => res.text())
  .then((data) => {
    // Parse the response data
    let jsonData = JSON.parse(data.substring(47).slice(0, -2));
    console.log(jsonData.table.rows[1]?.c[0]?.v ?? null)
    // Extract values from the response
    //Logo round 16
    let valueA = [
      jsonData.table.rows[0]?.c[0]?.v ?? null,
      jsonData.table.rows[1]?.c[0]?.v ?? null,
      jsonData.table.rows[2]?.c[0]?.v ?? null,
      jsonData.table.rows[3]?.c[0]?.v ?? null,

    ];
    //score quarter-final
    let valueB = [
      jsonData.table.rows[0]?.c[1]?.v ?? null,
      jsonData.table.rows[1]?.c[1]?.v ?? null,
      jsonData.table.rows[2]?.c[1]?.v ?? null,
      jsonData.table.rows[3]?.c[1]?.v ?? null,


    ];
    //semi team
    let valueC = [
      jsonData.table.rows[0]?.c[2]?.v ?? null,
      jsonData.table.rows[1]?.c[2]?.v ?? null,
      jsonData.table.rows[2]?.c[2]?.v ?? null,
      jsonData.table.rows[3]?.c[2]?.v ?? null,

    ];
    for (let i = 0; i < 4; i++) {
      let teamImageElement = document.getElementById("teamSemi" + (i + 1));
      let teamname = document.getElementById("semi-team-" + (i + 1));
      let score_round_8 = document.getElementById("semi-score-" + (i + 1));
      
      score_round_8.textContent = valueC[i];
      teamImageElement.src = "https://drive.google.com/thumbnail?id=" + valueA[i];
      teamname.textContent = valueB[i];
    }

    //Check if score1 is greater than score2

    
    


    let valueD = [
      jsonData.table.rows[0]?.c[3]?.v ?? null,
      jsonData.table.rows[2]?.c[3]?.v ?? null,


    ];
    //score quarter-final
    let valueE = [
      jsonData.table.rows[0]?.c[4]?.v ?? null,
      jsonData.table.rows[2]?.c[4]?.v ?? null,


    ];
    //semi team
    let valueF = [
      jsonData.table.rows[0]?.c[5]?.v ?? null,
      jsonData.table.rows[2]?.c[5]?.v ?? null,

    ];

    for (let i = 0; i < 2; i++) {
      let teamImageElement = document.getElementById("teamfinal" + (i + 1));
      let teamname = document.getElementById("teamfinal-" + (i + 1));
      let score_round_8 = document.getElementById("score-final-" + (i + 1));
      score_round_8.textContent = valueF[i];
      teamImageElement.src = "https://drive.google.com/thumbnail?id=" +valueD[i];
      teamname.textContent = valueE[i];
    }

    

    let groupJ = [
      jsonData.table.rows[0]?.c[6]?.v ?? null
    ]
    let groupK = [
      jsonData.table.rows[0]?.c[7]?.v ?? null
    ]
    let groupL = [
      jsonData.table.rows[0]?.c[8]?.v ?? null
    ]
    let teamImageElementgrandFinal1 = document.getElementById("advance-grandFinal-team-1");
    let teamnamegrandFinal1 = document.getElementById("teamgrandFinal-1");
    let score_grand_final_1 = document.getElementById("score-grandFinal-1");
    teamImageElementgrandFinal1.src = "https://drive.google.com/thumbnail?id=" +groupJ[0];
    teamnamegrandFinal1.textContent = groupK[0];
    score_grand_final_1.textContent = groupL[0];
    var grandFinalteam1 = document.querySelector('.round .winners > div.matchups .matchup .participants .participant #score-grandFinal-1').parentNode;
    if (groupL[0] == 3){
      grandFinalteam1.classList.add('winner');
    }
  })
}