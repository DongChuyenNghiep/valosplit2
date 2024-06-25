const images = import.meta.glob('../image/*.{png,jpg,jpeg,gif}');

  export default function Allteamdata() {
    let SHEET_RANGE_TABLE = 'A7:H20';
    let SHEET_ID = '1s2Lyk37v-hZcg7-_ag8S1Jq3uaeRR8u-oG0zviSc26E'
    let SHEET_TITLE = 'Sheet4'
    let FULL_URL_TABLE = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE_TABLE}`;
    console.log(images);
    fetch(FULL_URL_TABLE)
        .then((res) => res.text())
        .then((rep) => {
            let data = JSON.parse(rep.substr(47).slice(0, -2));
  
            for (let k = 0; k < 8; k++) {
                let dataBody = document.getElementById('table-player' + k);
  
                // Assuming rowData[0] corresponds to the image URL
                let imageSrc = data.table.rows[2].c[k].v;
                // Regular expression to extract the ID from the image source URL
                const regex = /\/d\/(.+?)\/view/;
  
                // Extract the ID using the regular expression
                const match = imageSrc.match(regex);
                const fileId = match[1];
                // Now you can use this fileId for further operations
                let imageElement = document.createElement('img');
                imageElement.src = ` https://drive.google.com/thumbnail?id=${fileId}`;
  
                imageElement.classList.add('player-image'); // Add any necessary classes or attributes
  
                // Append the image to the "image-logo" div
                let imageContainer = dataBody.closest('.box1').querySelector('.image-logo');
                imageContainer.appendChild(imageElement);
  
                // For i % 2 == 0
                for (let i = 3; i < 12; i += 2) {
                    let rowDataOdd = data.table.rows[i].c;
                    let rowDataEven = data.table.rows[i + 1].c; // Accessing the next row's data
                
                    let row = document.createElement('tr');
                    
                    // Creating cells for odd and even data
                    let cell1 = document.createElement('td');
                    let cell2 = document.createElement('td');
                    let rank_image = document.createElement('img');
                    rank_image.classList.add('rank-icon');
                    let rankImageFile = '../image/' + rowDataOdd[k].v + '.png'; // Constructing the file name
                    images[rankImageFile]().then((module) => {
                        rank_image.src = module.default;
                      });
                    //console.log(images[rankImageFile]);
                    
                    cell2.textContent = rowDataEven[k].v; // Assuming the first value to be placed in cell2
                    cell1.append(rank_image);
                    row.appendChild(cell1);
                    row.appendChild(cell2);
                
                    dataBody.appendChild(row);
                }
                
                // Adding text from rowData[0] to the <section class="seed" id="seed">
                let seedSection = document.getElementById('team' + k);
                let seedText = document.createElement('p');
                seedText.textContent = data.table.rows[0].c[k].v; // Assuming rowData[0] contains the text for the <p> element
                seedSection.appendChild(seedText);
            }
        });
  }
