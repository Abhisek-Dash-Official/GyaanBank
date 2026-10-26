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