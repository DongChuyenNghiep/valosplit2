let SHEET_TITLE_CALENDER = 'Lịch trình';
let SHEET_RANGE_CALENDER = 'A2:F30';
let SHEET_ID_CALENDER = '1QggU0zafsVUpV7f-YDYHg5jAfxKAMWZgk57JZSvCVuU';
let FULL_URL_CALENDER = `https://docs.google.com/spreadsheets/d/${SHEET_ID_CALENDER}/gviz/tq?sheet=${SHEET_TITLE_CALENDER}&range=${SHEET_RANGE_CALENDER}`;
function fetchDataAndRefreshCalendar() {
fetch(FULL_URL_CALENDER)
  .then((res) => res.text())
  .then((rep) => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));
    let dataBody = document.getElementById('calender');
    
    let events = [];

    for (let i = 0; i < data.table.rows.length; i++) {
      let rowData = data.table.rows[i].c;

      // Add each event to the events array
      events.push({
        title: rowData[0].v,
        start: rowData[4].v,
        end: rowData[5].v,
        color: '#'+rowData[3].v,
      });
    }
    $(document).ready(function() {
      $('#calendar').fullCalendar({
        locale: 'vi-vn',
        header: {
          left: 'prev,next,today',
          center: 'title',
          right: 'month'
        },
        defaultDate: new Date(),
        navLinks: true,
        editable: false,
        eventLimit: true,
        events: events  // Set the events array
      });
    });
  });
}
fetchDataAndRefreshCalendar();

// Fetch and refresh every 5 minutes (300,000 milliseconds)
setInterval(fetchDataAndRefreshCalendar, 1000);