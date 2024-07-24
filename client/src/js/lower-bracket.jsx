

export default function LowerBracket(){
  let SHEET_ID = '1s2Lyk37v-hZcg7-_ag8S1Jq3uaeRR8u-oG0zviSc26E';
  let SHEET_TITLE = 'Playoff';
  let SHEET_RANGE_LOWER = 'A6:L7';

let FULL_URL_LOWER= `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE_LOWER}`;

fetch(FULL_URL_LOWER)
    .then((res) => res.text())
    .then((data) => {
        // Parse the response data
        let jsonData = JSON.parse(data.substring(47).slice(0, -2));

        // Extract values from the response
        //Logo round 16
        let valueA = [
          jsonData.table.rows[0]?.c[0]?.v ?? null,
          jsonData.table.rows[1]?.c[0]?.v ?? null,

      ];
        //score quarter-final
        let valueB = [
        jsonData.table.rows[0]?.c[1]?.v ?? null,
        jsonData.table.rows[1]?.c[1]?.v ?? null,

        ];
        let valueC = [
        jsonData.table.rows[0]?.c[2]?.v ?? null,
        jsonData.table.rows[1]?.c[2]?.v ?? null,



      ];
        for (let i = 0; i < 2; i++) {
          let teamImageElement = document.getElementById("teamLower" + (i+1));
          let teamname = document.getElementById("team-lower-" + (i+1));
          let score_round_1 = document.getElementById("score-lower-" + (i+1));
          teamImageElement.src = "https://drive.google.com/thumbnail?id=" +valueA[i];
          teamname.textContent = valueB[i];
          score_round_1.textContent = valueC[i];
        }


        let valueD=[
        jsonData.table.rows[0]?.c[3]?.v ?? null,
        jsonData.table.rows[1]?.c[3]?.v ?? null,


        ];

        let valueE = [
        jsonData.table.rows[0]?.c[4]?.v ?? null,
        jsonData.table.rows[1]?.c[4]?.v ?? null,

        ];
        let valueF = [
          jsonData.table.rows[0]?.c[5]?.v ?? null,
          jsonData.table.rows[1]?.c[5]?.v ?? null,

        ];
          for (let i = 0; i < 2; i++) {
            let teamImageElement = document.getElementById("teamSemilower" + (i+1));
            let teamname = document.getElementById("semi-lower-" + (i+1));
            let score_round_16 = document.getElementById("semi-lowerscore-" + (i+1));
            teamImageElement.src = "https://drive.google.com/thumbnail?id=" +valueD[i];
            teamname.textContent = valueE[i];
            score_round_16.textContent = valueF[i];
          }


       
        let groupM = [
          jsonData.table.rows[0]?.c[6]?.v ?? null
        ]
        let groupN = [
          jsonData.table.rows[0]?.c[7]?.v ?? null
        ]
        let groupO = [
          jsonData.table.rows[0]?.c[8]?.v ?? null
        ]
      let teamImageElementgrandFinal2 = document.getElementById("advance-grandFinal-team-2");
      let teamnamegrandFinal2 = document.getElementById("teamgrandFinal-2");
      let score_grand_final_2 = document.getElementById("score-grandFinal-2");
      teamImageElementgrandFinal2.src = "https://drive.google.com/thumbnail?id=" +groupM[0];
      teamnamegrandFinal2.textContent = groupN[0];
      score_grand_final_2.textContent = groupO[0];
      var grandFinalteam2 = document.querySelector('.round .winners > div.matchups .matchup .participants .participant #score-grandFinal-1').parentNode;
      if (groupO[0] == 3){
        grandFinalteam2.classList.add('winner');
      }
      let groupP = [
        jsonData.table.rows[0]?.c[9]?.v ?? null
      ]
      let groupQ = [
        jsonData.table.rows[0]?.c[10]?.v ?? null
      ]
      let teamImageChampion = document.getElementById("champion1st");
      let teamnameChampion = document.getElementById("teamgrandChampion");
      teamImageChampion.src = "https://drive.google.com/thumbnail?id=" +groupP[0];
      teamnameChampion.textContent = groupQ[0];
        
    })
  }