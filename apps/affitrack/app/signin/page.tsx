"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {

    const [email, setEmail] = useState("")

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 border rounded-xl">
                <h1 className="text-2xl font-bold">
                Sign in to Affitrack
                </h1>

                <p className="mt-2 text-gray-500">
                Continue with your Google account
                </p>

                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="p-1 border rounded-lg" />

                <button 
                onClick={() => signIn("email",{email, callbackUrl: "/dashboard"})}
                className="rounded-sm p-0.5 px-2 m-1 bg-black text-white"
                >
                    Sing In
                </button>

                <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full mt-6 border rounded-lg py-3"
                >
                Continue with Google
                </button>
            </div>
        </div>
    );
}