import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../css/calendar.css'
export default function Calendar() {
  const [events, setEvents] = useState([]);

  const SHEET_TITLE_CALENDAR = 'Lịch trình';
  const SHEET_RANGE_CALENDAR = 'A2:F30';
  const SHEET_ID_CALENDAR = '1QggU0zafsVUpV7f-YDYHg5jAfxKAMWZgk57JZSvCVuU';
  const FULL_URL_CALENDAR = `https://docs.google.com/spreadsheets/d/${SHEET_ID_CALENDAR}/gviz/tq?sheet=${SHEET_TITLE_CALENDAR}&range=${SHEET_RANGE_CALENDAR}`;

  useEffect(() => {
    fetch(FULL_URL_CALENDAR)
      .then((res) => res.text())
      .then((rep) => {
        const data = JSON.parse(rep.substr(47).slice(0, -2));
        const fetchedEvents = data.table.rows.map((row) => {
          const rowData = row.c;
          return {
            title: rowData[0].v,
            start: rowData[4].v,
            end: rowData[5].v,
            color: `#${rowData[3].v}`,
          };
        });
        setEvents(fetchedEvents);
      });
  }, []);

  return (
    <div style={{marginTop:'100px'}}>
    <FullCalendar 
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locale="vi"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay',
      }}
      events={events}
    />
    </div>
  );
}
