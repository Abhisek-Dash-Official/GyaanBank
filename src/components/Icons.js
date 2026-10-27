export function BrandMark({ className = "w-16 h-16" }) {
    return (
        <img
            src="/logo.png"
            alt="Brand Logo"
            className={className}
        />
    );
}


export function ChevronDownIcon({ className = "w-4 h-4" }) {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
            />
        </svg>
    );
}

export function ArrowLeftIcon({ className = "w-4 h-4" }) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15 10H5M5 10L10 5M5 10L10 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function MenuIcon({ className = "w-5 h-5" }) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3 5H17M3 10H17M3 15H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
            />
        </svg>
    );
}

export function CloseIcon({ className = "w-5 h-5" }) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
            />
        </svg>
    );
}

export function ExternalLinkIcon({ className = "w-4 h-4" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
    );
}