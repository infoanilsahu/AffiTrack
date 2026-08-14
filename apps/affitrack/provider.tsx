"use client"
import { SessionProvider } from "next-auth/react";


export function Providers({ children }:ProvidersProps) {
    return <>
    <SessionProvider>
        {children}
    </SessionProvider>
    </>
}

interface ProvidersProps {
    children: React.ReactNode;
}