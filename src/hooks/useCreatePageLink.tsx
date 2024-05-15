import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useCreatePageLink = (prefix: string, primaryColor: string, defaultColor: string) => {
    const location = useLocation();

    return useMemo(() => (to: string, title: string, Icon: React.ComponentType<{ color: string }>) => {
        const path = `${prefix}${to !== '.' ? to : ''}`;
        return {
            to: path,
            title,
            icon: <Icon color={location.pathname === path ? primaryColor : defaultColor} />
        };
    }, [location, prefix, primaryColor, defaultColor]);
};