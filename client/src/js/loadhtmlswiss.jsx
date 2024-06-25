export default function LoadHTML(){
    let SHEET_RANGE_TABLE = 'A2:L53';
    let SHEET_ID = '1s2Lyk37v-hZcg7-_ag8S1Jq3uaeRR8u-oG0zviSc26E'
    let SHEET_TITLE = 'Sheet4'
    let FULL_URL_TABLE = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE_TABLE}`;
    fetch(FULL_URL_TABLE)
        .then((res) => res.text())
        .then((rep) => {
            let data = JSON.parse(rep.substr(47).slice(0, -2));
            let rowData = data.table.rows.slice(35, 53);
let valueA = [];
let valueB = [];
let valueC = [];
let valueD = [];
let valueE = [];
let valueF = [];
let valueK = {};
let valueL = [];
let valueM = [];

for (let i = 0; i < 8; i++) {
    valueA.push(data.table.rows[i]?.c[0]?.v ?? null);
    valueB.push(data.table.rows[i]?.c[1]?.v ?? null);
    valueC.push(data.table.rows[i]?.c[2]?.v ?? null);
    valueD.push(data.table.rows[i]?.c[3]?.v ?? null);
    valueE.push(data.table.rows[i]?.c[4]?.v ?? null);
    valueF.push(data.table.rows[i]?.c[5]?.v ?? null);
}

for (let i = 0; i < 4; i++) {
    valueK[data.table.rows[i]?.c[10]?.v ?? null] = data.table.rows[i]?.c[11]?.v ?? null;
}

for (let position in valueK) {
    valueL.push({ position: parseInt(position), logo: valueK[position] });
}

for (let i = 4; i < 8; i++) {
    valueM.push(data.table.rows[i]?.c[11]?.v ?? null);
}

// Create matchups container
const matchupsContainer = document.createElement('div');
matchupsContainer.classList.add('matchups');

// Loop to create each matchup
const createTeamDiv = (logoSrc, score) => {
    const teamDiv = document.createElement('div');
    teamDiv.classList.add('team');

    const logoTeamDiv = document.createElement('div');
    logoTeamDiv.classList.add('logo-team');
    const logoImg = document.createElement('img');
    logoImg.src = logoSrc;
    logoImg.alt = '';
    logoTeamDiv.appendChild(logoImg);
    teamDiv.appendChild(logoTeamDiv);

    const scoreDiv = document.createElement('div');
    scoreDiv.classList.add('score');
    const scoreP = document.createElement('p');
    scoreP.textContent = score;
    scoreDiv.appendChild(scoreP);
    teamDiv.appendChild(scoreDiv);

    return teamDiv;
};

const createModal = (i, rowData, group, amountplus, col) => {
    const mymodelid = document.createElement('div');
    mymodelid.id = "myModal" + group + i;
    mymodelid.classList.add('modal');

    const modal_content = document.createElement('div');
    modal_content.classList.add('modal-content');
    modal_content.id = 'matchid' + group + (i / 2 + 1 + amountplus);

    const close_span = document.createElement('span');
    close_span.classList.add('close');
    close_span.innerHTML = '&times;';
    close_span.addEventListener('click', function () { closeModal(i, group); });

    const map_pick_label = document.createElement('p');
    map_pick_label.classList.add("map_pick_label");
    map_pick_label.innerHTML = 'Map pick';

    const img_pick = document.createElement('img');
    img_pick.classList.add("map_pick");

    const img_pick1 = document.createElement('img');
    img_pick1.classList.add("map_pick");
    const img_pick2 = document.createElement('img');
    img_pick2.classList.add("map_pick");
    const img_pick3 = document.createElement('img');
    img_pick3.classList.add("map_pick");
    const div_map = document.createElement('div');
    div_map.classList.add("map_pick_all");

    const baseIndex = (i / 2) * 3 + 1;
    
    if (rowData[baseIndex + 2] && rowData[baseIndex + 2].c && rowData[baseIndex + 2].c[col]) {
        img_pick1.src = rowData[baseIndex]?.c[col]?.v ? "image/" + rowData[baseIndex].c[col].v + ".jpg" : "image/TBD.jpg";
        img_pick2.src = rowData[baseIndex + 1]?.c[col]?.v ? "image/" + rowData[baseIndex + 1].c[col].v + ".jpg" : "image/TBD.jpg";
        img_pick3.src = rowData[baseIndex + 2]?.c[col]?.v ? "image/" + rowData[baseIndex + 2].c[col].v + ".jpg" : "image/TBD.jpg";
    }

    modal_content.appendChild(close_span);
    modal_content.appendChild(map_pick_label);
    div_map.appendChild(img_pick1);
    div_map.appendChild(img_pick2);
    div_map.appendChild(img_pick3);
    modal_content.appendChild(div_map);
    mymodelid.appendChild(modal_content);

    return mymodelid;
};

const createMatchup = (i, valueA, valueB, rowData, containerClass, group, amountplus, col) => {
    const container = document.querySelector(containerClass);
    const matchupsContainer = document.createElement('div');
    matchupsContainer.classList.add('matchups');
    matchupsContainer.appendChild(createModal(i, rowData, group, amountplus, col));

    const link_info_match = document.createElement('a');
    link_info_match.classList.add('link-match-info');
    link_info_match.onclick = function () { openModal(i, group); };

    const matchupDiv = document.createElement('div');
    matchupDiv.classList.add('matchup');

    const regex = /\/d\/(.+?)\/view/;

    let link_drive_image_A = valueA[i];
    const fileIdA = link_drive_image_A.match(regex)[1];
    const logoSrcA = `https://drive.google.com/thumbnail?id=${fileIdA}`;
    const team1Div = createTeamDiv(logoSrcA, valueB[i]);
    matchupDiv.appendChild(team1Div);

    let link_drive_image_B = valueA[i+1];
    const fileIdB = link_drive_image_B.match(regex)[1];
    const logoSrcB = `https://drive.google.com/thumbnail?id=${fileIdB}`;
    const team2Div = createTeamDiv(logoSrcB, valueB[i + 1]);
    matchupDiv.appendChild(team2Div);

    link_info_match.appendChild(matchupDiv);
    matchupsContainer.appendChild(link_info_match);
    container.appendChild(matchupsContainer);
};

for (let i = 0; i < 8; i += 2) {
    createMatchup(i, valueA, valueB, rowData, '.w0-l0', "A", 0, 0);
}
for (let i = 0; i < 4; i += 2) {
    createMatchup(i, valueC, valueD, rowData, '.w1-l0', "B", 4, 1);
}
for (let i = 4; i < 8; i += 2) {
    createMatchup(i, valueC, valueD, rowData, '.w0-l1', "B", 4, 1);
}

for (let i = 0; i < 3; i += 2) {
    createMatchup(i, valueE, valueF, rowData, '.w1-l1', "C", 8, 2);
}

// Create eliminate-teams container
const eli = document.querySelector('.eliminate');
const eliminateTeamsContainer = document.createElement('div');
eliminateTeamsContainer.classList.add('eliminate-teams');

// Create all-teams containeradvanceTeamsContainer
const allTeamsContainerEli = document.createElement('div');
allTeamsContainerEli.classList.add('all-teams-eli');

// Loop through teams and create team elements
valueM.forEach(teamName => {
    const teamDiv = document.createElement('div');
    teamDiv.classList.add('team');

    const logoTeamDiv = document.createElement('div');
    logoTeamDiv.classList.add('logo-team');

    const teamImg = document.createElement('img');
    const regex = /\/d\/(.+?)\/view/;
    let link_drive_image = teamName;
    const logoteamA = link_drive_image.match(regex);
    const fileIdA = logoteamA[1];
    teamImg.src = `https://drive.google.com/thumbnail?id=${fileIdA}`;
    teamImg.alt = '';

    logoTeamDiv.appendChild(teamImg);
    teamDiv.appendChild(logoTeamDiv);
    allTeamsContainerEli.appendChild(teamDiv);
});

eliminateTeamsContainer.appendChild(allTeamsContainerEli);
eli.appendChild(eliminateTeamsContainer);

// Advance teams
const adva = document.querySelector('.advance');
const advanceTeamsContainer = document.createElement('div');
advanceTeamsContainer.classList.add('advance-teams');

// Create all-teams-win container
const allTeamsWinContainer = document.createElement('div');
allTeamsWinContainer.classList.add('all-teams-win');

// Loop through teamsData and create team elements
valueL.forEach(team => {
    const teamDiv = document.createElement('div');
    teamDiv.classList.add('team');

    const posDiv = document.createElement('div');
    posDiv.classList.add('pos');
    const posP = document.createElement('p');
    posP.textContent = team.position;
    posDiv.appendChild(posP);

    const logoTeamDiv = document.createElement('div');
    logoTeamDiv.classList.add('logo-team');

    const teamImg = document.createElement('img');
    const regex = /\/d\/(.+?)\/view/;
    let link_drive_image = team.logo;
    const logoteamA = link_drive_image.match(regex);
    const fileIdA = logoteamA[1];
    teamImg.src = `https://drive.google.com/thumbnail?id=${fileIdA}`;
    teamImg.alt = '';

    teamDiv.appendChild(posDiv);
    logoTeamDiv.appendChild(teamImg);
    teamDiv.appendChild(logoTeamDiv);
    allTeamsWinContainer.appendChild(teamDiv);
});

advanceTeamsContainer.appendChild(allTeamsWinContainer);
adva.appendChild(advanceTeamsContainer);

         });
}
function openModal(modalNum, group) {
    var modal = document.getElementById("myModal" + group + modalNum);
    modal.style.display = "block";
}

// Function to close the modal
function closeModal(modalNum, group) {
    var modal = document.getElementById("myModal" + group + modalNum);
    modal.style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}
  