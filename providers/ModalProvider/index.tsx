"use client";

// hooks
import { useEffect, useState } from "react";

// custom components
import { AuthModal, UploadModal, SubscribeModal } from "../../components";

// interfaces
import { ProductWithPrice } from "../../types/product-with-price";
export interface ModalProviderProps {
    products: ProductWithPrice[];
}

const ModalProvider = ({
    products,
}: ModalProviderProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
    
    return (
        <>
            <AuthModal />
            <UploadModal />
            <SubscribeModal products={products} />
        </>
    );
};

export default ModalProvider;