import styles from "./Grid.module.scss";

interface GridProps {
    children: React.ReactNode;
    gap?: number; // Gap between grid items
    margin?: string; // Margin around the grid
}

export const Grid: React.FC<GridProps> = ({ children, gap = 32, margin = 0 }) => (
    <div className={styles.grid} style={{ gap: gap, margin: margin }}>
        {children}
    </div>
);

interface GridItemProps {
    children: React.ReactNode;
    columnSpan?: number; // Number of columns the item should span
    rowSpan?: number; // Number of rows the item should span
    gridColumnStart?: number;
    gridColumnEnd?: number;
    gridRowStart?: number;
    gridRowEnd?: number;
}

export const GridItem: React.FC<GridItemProps> = ({
    children,
    columnSpan = 1,
    rowSpan = 1,
}) => (
    <div style={{
        gridColumn: `span ${columnSpan}`,
        gridRow: `span ${rowSpan}`
    }}>
        {children}
    </div>
);