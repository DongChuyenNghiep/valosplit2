document.addEventListener('DOMContentLoaded', function () {
    let SHEET_RANGE_TABLE_AGENT = 'D1:E8';
    let SHEET_ID = '1s2Lyk37v-hZcg7-_ag8S1Jq3uaeRR8u-oG0zviSc26E';
    let SHEET_TITLE = 'Stat';
    let FULL_URL_TABLE_AGENT = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE_TABLE_AGENT}`;
    let SHEET_RANGE_TABLE_MAP = 'D25:E31';
    let FULL_URL_TABLE_MAP = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE_TABLE_MAP}`;
    let SHEET_RANGE_TABLE_HS = 'G1:J21'
    let FULL_URL_TABLE_HS = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE_TABLE_HS}`;

    fetch(FULL_URL_TABLE_AGENT)
        .then((res) => res.text())
        .then((rep) => {
            let data = JSON.parse(rep.substr(47).slice(0, -2));
            let labels = [];
            let values = [];
            let backgroundColors = [];
            let borderColors = [];

            let colors = [
                { background: 'rgba(255, 99, 132, 0.2)', border: 'rgba(255, 99, 132, 1)' },
                { background: 'rgba(54, 162, 235, 0.2)', border: 'rgba(54, 162, 235, 1)' },
                { background: 'rgba(255, 206, 86, 0.2)', border: 'rgba(255, 206, 86, 1)' },
                { background: 'rgba(75, 192, 192, 0.2)', border: 'rgba(75, 192, 192, 1)' },
                { background: 'rgba(153, 102, 255, 0.2)', border: 'rgba(153, 102, 255, 1)' },
                { background: 'rgba(255, 159, 64, 0.2)', border: 'rgba(255, 159, 64, 1)' },
                { background: 'rgba(199, 199, 199, 0.2)', border: 'rgba(199, 199, 199, 1)' },
                { background: 'rgba(226,210,18, 0.2)', border: 'rgba(226,210,18, 1)' }
            ];

            for (let i = 0; i < data.table.rows.length; i++) {
                let row = data.table.rows[i].c;
                labels.push(row[0].v);
                values.push(row[1].v);
                backgroundColors.push(colors[i % colors.length].background);
                borderColors.push(colors[i % colors.length].border);
            }

            const ctx = document.getElementById('myBarChartagent').getContext('2d');
            const myBarChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Agent Picks',
                        data: values,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1
                    }]
                },

                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                    }
                }
            });
        });

    fetch(FULL_URL_TABLE_MAP)
        .then((res) => res.text())
        .then((rep) => {
            let data = JSON.parse(rep.substr(47).slice(0, -2));
            let labels = [];
            let values = [];
            let backgroundColors = [];
            let borderColors = [];

            let colors = [
                { background: 'rgba(255, 99, 132, 0.2)', border: 'rgba(255, 99, 132, 1)' },
                { background: 'rgba(54, 162, 235, 0.2)', border: 'rgba(54, 162, 235, 1)' },
                { background: 'rgba(255, 206, 86, 0.2)', border: 'rgba(255, 206, 86, 1)' },
                { background: 'rgba(75, 192, 192, 0.2)', border: 'rgba(75, 192, 192, 1)' },
                { background: 'rgba(153, 102, 255, 0.2)', border: 'rgba(153, 102, 255, 1)' },
                { background: 'rgba(255, 159, 64, 0.2)', border: 'rgba(255, 159, 64, 1)' },
                { background: 'rgba(199, 199, 199, 0.2)', border: 'rgba(199, 199, 199, 1)' },
                { background: 'rgba(226,210,18, 0.2)', border: 'rgba(226,210,18, 1)' }
            ];

            for (let i = 0; i < data.table.rows.length; i++) {
                let row = data.table.rows[i].c;
                labels.push(row[0].v);
                values.push(row[1].v);
                backgroundColors.push(colors[i % colors.length].background);
                borderColors.push(colors[i % colors.length].border);
            }

            const ctx = document.getElementById('myBarChartmap').getContext('2d');
            const myBarChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Picks',
                        data: values,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1
                    }]
                },

                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                    }
                }
            });
        });

    fetch(FULL_URL_TABLE_HS)
        .then((res) => res.text())
        .then((rep) => {
            let datajson = JSON.parse(rep.substr(47).slice(0, -2));
            let labels = ['Match 1', 'Match 2', 'Match 3'];
            let values = [];
            const data = {};
            const options = [];
            const matchDropdown = document.createElement('select');
            matchDropdown.id = 'matchDropdown';
            for (let k = 0; k < datajson.table.rows.length; k++) {
                const matchValue = datajson.table.rows[k].c[0].v;
                options.push({ value: matchValue, text: matchValue });
            }
            console.log(options)
            options.forEach(optionData => {
                const option = document.createElement('option');
                option.value = optionData.value;
                option.textContent = optionData.text;
                matchDropdown.appendChild(option);
            });
            document.getElementById('option').appendChild(matchDropdown);
            options.forEach(option => {
                data[option.value] = [];
            });

            for (let i = 1; i < 4; i++) {
                values.push(datajson.table.rows[0].c[i].v);
                // Populate the data object with the appropriate values
                for (let k = 0; k < options.length; k++) {
                    const optionValue = options[k].value;
                    data[optionValue].push(datajson.table.rows[k].c[i].v);
                }
            }


            const ctx = document.getElementById('myBarChartHS').getContext('2d');
            const myBarChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Average HS',
                        data: values,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: 'Headshot',
                        data: data['Match 1'],
                        fill: false,
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            beginAtZero: true
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            document.getElementById('matchDropdown').addEventListener('change', function () {
                const selectedMatch = this.value;
                myBarChart.data.datasets[1].data = data[selectedMatch];
                myBarChart.update();
            });
        });
});
