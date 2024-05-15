import React from "react";
import styles from "./pageTemplate.module.scss";

interface PageTemplateProps {
    children: React.ReactNode;

}

export default function PageTemplate({ children }: PageTemplateProps) {
    return (
        <aside className={styles.page}>
            {children}
        </ aside>
    )
}