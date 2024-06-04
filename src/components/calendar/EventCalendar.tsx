import { useState, useCallback, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import { CalendarOptions, EventClickArg, EventApi as FullCalendarEventApi } from '@fullcalendar/core';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { MusicIcon, MedalIcon, AwardIcon, HelpCircleIcon, UsersIcon } from 'lucide-react';
import { formatDate, isToday, formatTime } from '@/lib/utils';
import "./eventCalendar.scss";


interface EventCalendarProps extends CalendarOptions {
    isFullCalendar?: boolean;
    height?: number | string;
}

interface CalendarEventCardProps {
    event: EventApi;
}

interface CalendarHeaderProps {
    date: Date;
    isFullCalendar: boolean;
}

interface EventApi extends FullCalendarEventApi {
    extendedProps: ExtendedProps;
}

interface ExtendedProps {
    type: EventType;
}

type EventType = 'sport' | 'concert' | 'ceremony' | 'other' | 'conference';

const EVENT_TYPE_TO_ICON = {
    sport: <MedalIcon size={20} />,
    concert: <MusicIcon size={20} />,
    ceremony: <AwardIcon size={20} />,
    other: <HelpCircleIcon size={20} />,
    conference: <UsersIcon size={20} />,
};

export default function EventCalendar({ plugins, headerToolbar, initialView, isFullCalendar = true, height = "auto" }: EventCalendarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);

    // @TODO: Replace with real data fetched from the API endpoint
    const events = [
        { title: "Event 1", start: "2024-06-03T10:00:00", end: "2024-06-03T14:00:00", type: "sport" },
        { title: "Event 2", start: "2024-06-03T19:00:00", end: "2024-06-03T21:00:00", type: "concert" },
        { title: "Event 3", start: "2024-06-04T17:00:00", end: "2024-06-04T20:00:00", type: "sport" },
    ];

    const handleEventClick = useCallback((clickInfo: EventClickArg) => {
        const event = clickInfo.event;
        setSelectedEvent(event as unknown as EventApi);
        setIsOpen(true);
    }, []);

    return (
        <>
            <FullCalendar
                plugins={plugins}
                headerToolbar={headerToolbar}
                initialView={initialView}
                slotDuration="01:00:00"
                slotMinTime="08:00:00"
                allDaySlot={false}
                height={height}
                events={events}
                eventContent={({ event }) => {
                    if (isEventApi(event)) {
                        return <CalendarEventCard event={event} />
                    }
                }}
                eventClassNames={event => "event-type " + event.event.extendedProps.type}
                dayHeaderContent={({ date }) => {
                    return <CalendarHeader date={date} isFullCalendar={isFullCalendar} />
                }}
                eventClick={handleEventClick}
            />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetDescription>
                            {selectedEvent?.start && new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'long' }).format(selectedEvent.start)} - {selectedEvent?.start && new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(selectedEvent.start)}
                        </SheetDescription>
                        <SheetTitle>{selectedEvent?.title}</SheetTitle>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    )
}

function isEventApi(event: any): event is EventApi {
    return event.extendedProps !== undefined;
}

const CalendarHeader = ({ date, isFullCalendar }: CalendarHeaderProps) => {
    if (isFullCalendar === false) {
        return;
    }

    const weekday = formatDate(date, { weekday: 'long' });
    const day = formatDate(date, { day: 'numeric' });
    const isTodayDate = isToday(date, 'Europe/Paris'); // Currently, the default timezone is set to Europe/Paris

    return (
        <div className={`fc-day-header-content ${isTodayDate ? 'today' : ''}`}>
            <div className="fc-day-header-content-weekday">{weekday}</div>
            <div className="fc-day-header-content-day">{day}</div>
        </div>
    );
}

const CalendarEventCard = ({ event }: CalendarEventCardProps) => {
    const startTime = useMemo(() => event.start ? formatTime(event.start) : '', [event.start]);
    const endTime = useMemo(() => event.end ? formatTime(event.end) : '', [event.end]);

    return (
        <div className="fc-event-main-frame">
            <h3 className="fc-event-title">{event.title}</h3>
            <span className="fc-event-time">{startTime} - {endTime}</span>
            <div className={`fc-event-type ${event.extendedProps.type}`}>{EVENT_TYPE_TO_ICON[event.extendedProps.type]}</div>
        </div>
    )
}