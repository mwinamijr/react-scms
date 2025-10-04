import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchEvents } from "../../features/administration/schoolEventSlice";
import { Typography, Spin } from "antd";
import dayjs from "dayjs";

const { Title } = Typography;

const SchoolEventsCalendar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, loading } = useAppSelector((state) => state.getSchoolEvents);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const calendarEvents = events.map((e) => ({
    id: String(e.id),
    title: `${e.name} (${e.event_type})`,
    start: e.start_date,
    end: e.end_date ?? e.start_date,
    extendedProps: {
      description: e.description,
      academic_year: e.academic_year,
      term: e.term_name,
    },
  }));

  return (
    <div style={{ padding: 24 }}>
      <Title level={4}>📅 School Calendar View</Title>
      {loading ? (
        <Spin />
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
          events={calendarEvents}
          eventClick={(info) => {
            const { title, start, end, extendedProps } = info.event;
            alert(
              `📌 ${title}\n🗓 ${dayjs(start).format("YYYY-MM-DD")} to ${
                end ? dayjs(end).format("YYYY-MM-DD") : "N/A"
              }\n📚 Term: ${extendedProps.term}\n📖 Academic Year: ${
                extendedProps.academic_year
              }\n📝 ${extendedProps.description}`
            );
          }}
          height="auto"
        />
      )}
    </div>
  );
};

export default SchoolEventsCalendar;
