"use client";

// hooks
import { useEffect, useState } from "react";

// custom components
import { AuthModal, Modal } from "../../components";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
    
    return (
        <>
            <AuthModal />
        </>
    );
};

export default ModalProvider;