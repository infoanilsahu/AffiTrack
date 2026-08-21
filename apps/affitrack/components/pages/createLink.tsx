"use client"

import { useState } from "react"
import { api } from "../../lib/axios";
import { redirect } from "next/navigation";

export function CreateLink({ orgSlug }: CreateLinkProp) {
    const [url, setUrl] = useState("");

    const handleCreate = async () => {
        if (url) {
            const res = await api.post("/api/link/create",{
                url, orgSlug
            })

            if( res.status === 200 ) {
                redirect(`/${orgSlug}/links`)
            }
        }
    };

    return (
        <div>
            <input
                type='url'
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder='Enter URL'
                className="p-1 ring-1 rounded-md m-2 w-120"
            />
            <div>
                <button 
                    onClick={handleCreate}
                    className="bg-green-400 text-white p-1.5 px-2 rounded-lg m-2 "
                >
                    Create Link
                </button>
            </div>
        
        </div>
    );
}


interface CreateLinkProp {
    orgSlug: string;
}