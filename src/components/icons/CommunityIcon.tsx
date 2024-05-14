const CommunityIcon = ({ color = '#7295B0' }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_349_16937)">
                <ellipse cx="7.00065" cy="5.33342" rx="1.66667" ry="1.66667" stroke={color} stroke-width="1.5" />
                <ellipse cx="7" cy="8.66667" rx="2.5" ry="1.66667" stroke={color} stroke-width="1.5" />
                <circle cx="17.0007" cy="15.3334" r="1.66667" stroke={color} stroke-width="1.5" />
                <path d="M20.3327 12.0001C20.3327 7.39771 16.6017 3.66675 11.9993 3.66675M11.9993 20.3334C7.39698 20.3334 3.66602 16.6025 3.66602 12.0001" stroke={color} stroke-width="1.5" stroke-linecap="round" />
                <ellipse cx="17" cy="18.6667" rx="2.5" ry="1.66667" stroke={color} stroke-width="1.5" />
            </g>
            <defs>
                <clipPath id="clip0_349_16937">
                    <rect width="20" height="20" fill="white" transform="translate(2 2)" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default CommunityIcon;