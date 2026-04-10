"use client";

import { useEffect } from "react";

const serviceWorkerPath = "/sw.js";

const serviceWorkerScope = "/";

const localhost = "localhost";

export const ServiceWorkerRegister = () => {
    useEffect(
        () => {
            if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

            // Only register in production (skip on local dev)
            if (window.location.hostname === localhost) return;

            const registerSwHandler = async () => {
                try {
                    await navigator.serviceWorker.register(
                        serviceWorkerPath,
                        { scope: serviceWorkerScope },
                    );
                } catch {
                // Silently ignore registration failures
                }
            };

            registerSwHandler();
        },
        [],
    );

    return null;
};
