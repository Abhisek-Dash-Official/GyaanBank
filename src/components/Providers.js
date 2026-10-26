"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }) {
    return (
        <SessionProvider>
            {children}
            <ToastContainer
                position="bottom-right"
                autoClose={3500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="light"
                toastClassName="border border-slate-200 shadow-sm rounded-md text-sm font-sans text-slate-900"
            />
        </SessionProvider>
    );
}