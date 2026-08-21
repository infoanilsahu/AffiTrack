"use client"

export function LinksPage({ links }:LinksProps) {
    return (
        <>
            
        </>
    )
}

interface LinksProps {
    links: {
        id: string;
        linkSlug: string;
        destinationUrl: string;
        ordId: string;
    }[];
}