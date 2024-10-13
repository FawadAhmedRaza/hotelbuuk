"use client";
import { useState } from "react";

// ----------------------------------------------------------------------

export function useBoolean() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return {
        toggleDrawer,
        isOpen,
        setIsOpen,
    };
}
