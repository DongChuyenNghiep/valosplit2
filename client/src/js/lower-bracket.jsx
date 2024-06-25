let SHEET_RANGE_LOWER = 'A9:Q16';

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
          jsonData.table.rows[2]?.c[0]?.v ?? null,
          jsonData.table.rows[3]?.c[0]?.v ?? null

      ];
        //score quarter-final
        let valueB = [
        jsonData.table.rows[0]?.c[1]?.v ?? null,
        jsonData.table.rows[1]?.c[1]?.v ?? null,
        jsonData.table.rows[2]?.c[1]?.v ?? null,
        jsonData.table.rows[3]?.c[1]?.v ?? null,
        ];
        let valueC = [
        jsonData.table.rows[0]?.c[2]?.v ?? null,
        jsonData.table.rows[1]?.c[2]?.v ?? null,
        jsonData.table.rows[2]?.c[2]?.v ?? null,
        jsonData.table.rows[3]?.c[2]?.v ?? null,


      ];
        for (let i = 0; i < 4; i++) {
          let teamImageElement = document.getElementById("teamLower" + (i+1));
          let teamname = document.getElementById("team-lower-" + (i+1));
          let score_round_1 = document.getElementById("score-lower-" + (i+1));
          teamImageElement.src = valueA[i];
          teamname.textContent = valueB[i];
          score_round_1.textContent = valueC[i];
        }


        let valueD=[
        jsonData.table.rows[0]?.c[3]?.v ?? null,
        jsonData.table.rows[1]?.c[3]?.v ?? null,
        jsonData.table.rows[2]?.c[3]?.v ?? null,
        jsonData.table.rows[3]?.c[3]?.v ?? null,

        ];

        let valueE = [
        jsonData.table.rows[0]?.c[4]?.v ?? null,
        jsonData.table.rows[1]?.c[4]?.v ?? null,
        jsonData.table.rows[2]?.c[4]?.v ?? null,
        jsonData.table.rows[3]?.c[4]?.v ?? null,
        ];
        let valueF = [
          jsonData.table.rows[0]?.c[5]?.v ?? null,
          jsonData.table.rows[1]?.c[5]?.v ?? null,
          jsonData.table.rows[2]?.c[5]?.v ?? null,
          jsonData.table.rows[3]?.c[5]?.v ?? null,
        ];
          for (let i = 0; i < 4; i++) {
            let teamImageElement = document.getElementById("teamSemilower" + (i+1));
            let teamname = document.getElementById("semi-lower-" + (i+1));
            let score_round_16 = document.getElementById("semi-lowerscore-" + (i+1));
            teamImageElement.src = valueD[i];
            teamname.textContent = valueE[i];
            score_round_16.textContent = valueF[i];
          }

        let valueG = [
          jsonData.table.rows[0]?.c[6]?.v ?? null,
          jsonData.table.rows[2]?.c[6]?.v ?? null,

        ];
        let valueH = [
          jsonData.table.rows[0]?.c[7]?.v ?? null,
          jsonData.table.rows[2]?.c[7]?.v ?? null,

        ];
        let valueI = [
          jsonData.table.rows[0]?.c[8]?.v ?? null,
          jsonData.table.rows[2]?.c[8]?.v ?? null,

        ];

        for (let j = 0; j < 2; j++) {
          let teamImageElement = document.getElementById("teamFinallower" + (j+1));
          let teamname = document.getElementById("final-lower-" + (j+1));
          let score_round_16 = document.getElementById("final-lowerscore-" + (j+1));
          teamImageElement.src = valueG[j];
          teamname.textContent = valueH[j];
          score_round_16.textContent = valueI[j];
        }

        let valueJ = [
          jsonData.table.rows[0]?.c[9]?.v ?? null,
          jsonData.table.rows[2]?.c[9]?.v  ?? null,
  
          ];
          let valueK = [
            jsonData.table.rows[0]?.c[10]?.v  ?? null,
            jsonData.table.rows[2]?.c[10]?.v  ?? null,
  
          ];
          let valueL = [
            jsonData.table.rows[0]?.c[11]?.v  ?? null,
            jsonData.table.rows[2]?.c[11]?.v  ?? null,
  
          ];
          for (let j = 0; j < 2; j++) {
            let teamImageElement = document.getElementById("advance-team-" + (j+1));
            let teamname = document.getElementById("teamadvance-" + (j+1));
            let score_round_16 = document.getElementById("score-advance-" + (j+1));
            teamImageElement.src = valueJ[j];
            teamname.textContent = valueK[j];
            score_round_16.textContent = valueL[j];
          }


        var participantLowerTeam1 = document.querySelector('.loser-bracket .round .winners > div.matchups .matchup .participants .participant #score-lower-1').parentNode;
        var participantLowerTeam2 = document.querySelector('.loser-bracket .round .winners > div.matchups .matchup .participants .participant #score-lower-2').parentNode;
        var participantLowerTeam3 = document.querySelector('.loser-bracket .round .winners > div.matchups .matchup .participants .participant #score-lower-3').parentNode;
        var participantLowerTeam4 = document.querySelector('.loser-bracket .round .winners > div.matchups .matchup .participants .participant #score-lower-4').parentNode;
        var participantSemiLowerTeam1 = document.querySelector('.loser-bracket .round .winners > div.matchups .matchup .participants .participant #semi-lowerscore-1').parentNode;
        var participantSemiLowerTeam2 = document.querySelector('.loser-bracket .round .winners > div.matchups .matchup .participants .participant #semi-lowerscore-2').parentNode;
        var participantSemiLowerTeam3 = document.querySelector('.loser-bracket .round .winners > div.matchups .matchup .participants .participant #semi-lowerscore-3').parentNode;
        var participantSemiLowerTeam4 = document.querySelector('.loser-bracket .round .winners > div.matchups .matchup .participants .participant #semi-lowerscore-4').parentNode;
        var participantFinalLowerTeam1 = document.querySelector('.loser-bracket .round .winners > div.matchups .matchup .participants .participant #final-lowerscore-1').parentNode;
        var participantFinalLowerTeam2 = document.querySelector('.loser-bracket .round .winners > div.matchups .matchup .participants .participant #final-lowerscore-2').parentNode;
        var participantAdvanceLowerTeam1 = document.querySelector('.loser-bracket .round .winners > div.matchups .matchup .participants .participant #score-advance-1').parentNode;
        var participantAdvanceLowerTeam2 = document.querySelector('.loser-bracket .round .winners > div.matchups .matchup .participants .participant #score-advance-2').parentNode;
        //Check if score1 is greater than score2
        if (valueC[0]==2) {
          // Add the 'winner' class to the first div.participant
          participantLowerTeam1.classList.add('winner');
          participantLowerTeam2.classList.add('eliminate');
        } else if (valueC[1]==2)  {
          // Add the 'winner' class to the second div.participant
          participantLowerTeam1.classList.add('eliminate');
          participantLowerTeam2.classList.add('winner');
          
        }
        if (valueC[2]==2) {
            // Add the 'winner' class to the first div.participant
            participantLowerTeam3.classList.add('winner');
            participantLowerTeam4.classList.add('eliminate');
          } else if (valueC[3]==2) {
            // Add the 'winner' class to the second div.participant
            participantLowerTeam3.classList.add('eliminate');
            participantLowerTeam4.classList.add('winner');
          }
        if (valueF[0] == 2){
          participantSemiLowerTeam1.classList.add('winner');
          participantSemiLowerTeam2.classList.add('eliminate');
        }
        else if(valueF[1]==2){
          participantSemiLowerTeam1.classList.add('eliminate');
          participantSemiLowerTeam2.classList.add('winner');
        }
        if (valueF[2] == 2){
          participantSemiLowerTeam3.classList.add('winner');
          participantSemiLowerTeam4.classList.add('eliminate');
        }
        else if(valueF[3]==2){
          participantSemiLowerTeam3.classList.add('eliminate');
          participantSemiLowerTeam4.classList.add('winner');
        }
        if (valueI[0] == 2){
          participantFinalLowerTeam1.classList.add('winner');
          participantFinalLowerTeam2.classList.add('eliminate');
        }
        else if(valueI[1]==2){
          participantFinalLowerTeam1.classList.add('eliminate');
          participantFinalLowerTeam2.classList.add('winner');
        }
        if (valueL[0] == 2){
          participantFinalLowerTeam1.classList.add('winner');
          participantFinalLowerTeam2.classList.add('eliminate');
        }
        else if(valueL[1]==2){
          participantAdvanceLowerTeam1.classList.add('eliminate');
          participantAdvanceLowerTeam2.classList.add('winner');
        }  
        let groupM = [
          jsonData.table.rows[0]?.c[12]?.v ?? null
        ]
        let groupN = [
          jsonData.table.rows[0]?.c[13]?.v ?? null
        ]
        let groupO = [
          jsonData.table.rows[0]?.c[14]?.v ?? null
        ]
      let teamImageElementgrandFinal2 = document.getElementById("advance-grandFinal-team-2");
      let teamnamegrandFinal2 = document.getElementById("teamgrandFinal-2");
      let score_grand_final_2 = document.getElementById("score-grandFinal-2");
      teamImageElementgrandFinal2.src = groupM[0];
      teamnamegrandFinal2.textContent = groupN[0];
      score_grand_final_2.textContent = groupO[0];
      var grandFinalteam2 = document.querySelector('.round .winners > div.matchups .matchup .participants .participant #score-grandFinal-1').parentNode;
      if (groupO[0] == 3){
        grandFinalteam2.classList.add('winner');
      }
      let groupP = [
        jsonData.table.rows[0]?.c[15]?.v ?? null
      ]
      let groupQ = [
        jsonData.table.rows[0]?.c[16]?.v ?? null
      ]
      let teamImageChampion = document.getElementById("champion1st");
      let teamnameChampion = document.getElementById("teamgrandChampion");
      teamImageChampion.src = groupP[0];
      teamnameChampion.textContent = groupQ[0];
        
    })