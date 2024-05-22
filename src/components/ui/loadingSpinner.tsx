import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
    className?: string;
    size?: 's' | 'm' | 'l' | 'xl';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className, size = 'm' }) => {
    let dimensions;
    switch (size) {
        case 's':
            dimensions = '12';
            break;
        case 'l':
            dimensions = '32';
            break;
        case 'xl':
            dimensions = '48';
            break;
        default:
            dimensions = '24';
    }

    return (
        <div className={className}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={dimensions}
                height={dimensions}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("animate-spin stroke-primary")}
            >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
        </div>
    );
};

LoadingSpinner.displayName = "LoadingSpinner";