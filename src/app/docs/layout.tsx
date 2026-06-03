"use client";

import type React from "react";
import { useState } from "react";

import { Sidebar } from "@/components";
import { componentStringsData } from "@/data";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div>
            <button
                aria-label={componentStringsData.toggleNavigationLabel}
                className="
                    fixed
                    bottom-4
                    left-4
                    z-50
                    flex
                    h-12
                    w-12
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    shadow-lg
                    lg:hidden
                "
                style={{
                    backgroundColor: "var(--lint-pass)",
                    color: "#ffffff",
                }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    viewBox="0 0 24 24"
                >
                    {isSidebarOpen ? (
                        <path
                            d="M6 18L18 6M6 6l12 12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    ) : (
                        <g
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 7 q1.5 -1.8 3 0 t3 0 t3 0 t3 0 t3 0 t3 0" />
                            <path d="M3 12 q1.5 -1.8 3 0 t3 0 t3 0 t3 0 t3 0 t3 0" />
                            <path d="M3 17 q1.5 -1.8 3 0 t3 0 t3 0 t3 0 t3 0 t3 0" />
                        </g>
                    )}
                </svg>
            </button>
            {isSidebarOpen && (
                <div
                    style={{ backgroundColor: "var(--overlay)" }}
                    className="
                        fixed
                        inset-0
                        z-40
                        lg:hidden
                    "
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            <aside
                className={`
                    fixed
                    top-16
                    left-0
                    z-40
                    h-[calc(100vh-4rem)]
                    w-64
                    shrink-0
                    overflow-y-auto
                    transition-transform
                    duration-300
                    lg:translate-x-0
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
                style={{
                    backgroundColor: "var(--bg-sidebar)",
                    borderRight: "1px solid var(--border-primary)",
                }}
            >
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
            </aside>
            <div
                className="
                    mx-auto
                    max-w-7xl
                    px-6
                    py-10
                    sm:px-8
                    lg:py-12
                    lg:pr-8
                    lg:pl-64
                "
            >
                <article className="prose-docs animate-fade-in">{children}</article>
            </div>
        </div>
    );
};

export default DocsLayout;
