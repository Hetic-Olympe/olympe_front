import EventCalendar from "@/components/calendar/EventCalendar";
import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Calendar() {
    return (
        <>
            <Header title="Calendar" subtitle="Calendar of events" />
            <PageTemplate>
                <EventCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'timeGridWeek,timeGridDay,listWeek'
                    }}
                    initialView="timeGridWeek"
                />
            </PageTemplate>
        </>
    );
}