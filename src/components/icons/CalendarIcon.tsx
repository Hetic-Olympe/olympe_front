const CalendarIcon = ({ color = '#7295B0' }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.334 1.66675V4.16675" stroke={color} stroke-width="1.5" stroke-linecap="round" />
            <path d="M6.66602 1.66675V4.16675" stroke={color} stroke-width="1.5" stroke-linecap="round" />
            <path d="M2.5 6.91675C2.5 4.70761 4.29086 2.91675 6.5 2.91675H13.5C15.7091 2.91675 17.5 4.70761 17.5 6.91675V14.3334C17.5 16.5426 15.7091 18.3334 13.5 18.3334H6.5C4.29086 18.3334 2.5 16.5426 2.5 14.3334V6.91675Z" stroke={color} stroke-width="1.5" />
            <path d="M2.5 7.5H17.5" stroke={color} stroke-width="1.5" stroke-linecap="round" />
        </svg>
    )
}

export default CalendarIcon;