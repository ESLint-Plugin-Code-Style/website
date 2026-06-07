"use client";

import { MotionConfig } from "motion/react";
import type React from "react";
import {
    useCallback,
    useEffect,
    useMemo,
    useSyncExternalStore,
} from "react";

import { ThemeContext } from "@/contexts";
import { componentStringsData, constantsData } from "@/data";
import { EventNameEnum, ThemeEnum } from "@/enums";
import type { ResolvedThemeType, ThemeSnapshotType, ThemeType } from "@/types";

const getStoredThemeHandler = (): ThemeType => {
    const stored = localStorage.getItem(constantsData.localStorageKeys.theme);

    return stored === ThemeEnum.LIGHT || stored === ThemeEnum.DARK || stored === ThemeEnum.SYSTEM ? stored : ThemeEnum.SYSTEM;
};

const getSystemDarkHandler = (): boolean => window.matchMedia(componentStringsData.prefersColorSchemeDark).matches;

const resolveThemeHandler = (theme: ThemeType): ResolvedThemeType => {
    if (theme === ThemeEnum.SYSTEM) return getSystemDarkHandler() ? ThemeEnum.DARK : ThemeEnum.LIGHT;

    return theme;
};

let themeStore: ThemeSnapshotType = {
    resolved: ThemeEnum.LIGHT,
    theme: ThemeEnum.SYSTEM,
};

const themeListeners = new Set<() => void>();

const notifyListenersHandler = () => themeListeners.forEach((listener) => listener());

const subscribeToThemeHandler = (callback: () => void) => {
    themeListeners.add(callback);

    return () => themeListeners[constantsData.methodNames.deleteMethod](callback);
};

const getThemeSnapshotHandler = () => themeStore;

const themeServerSnapshot: ThemeSnapshotType = {
    resolved: ThemeEnum.LIGHT,
    theme: ThemeEnum.SYSTEM,
};

const getThemeServerSnapshotHandler = (): ThemeSnapshotType => themeServerSnapshot;

const updateThemeStoreHandler = (newTheme: ThemeType) => {
    const resolved = resolveThemeHandler(newTheme);

    themeStore = {
        resolved,
        theme: newTheme,
    };

    localStorage.setItem(
        constantsData.localStorageKeys.theme,
        newTheme,
    );

    document.documentElement.classList.toggle(
        ThemeEnum.DARK,
        resolved === ThemeEnum.DARK,
    );

    notifyListenersHandler();
};

const initializeThemeStoreHandler = () => {
    const theme = getStoredThemeHandler();

    const resolved = resolveThemeHandler(theme);

    themeStore = {
        resolved,
        theme,
    };

    document.documentElement.classList.toggle(
        ThemeEnum.DARK,
        resolved === ThemeEnum.DARK,
    );

    notifyListenersHandler();
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        resolved: resolvedTheme,
        theme,
    } = useSyncExternalStore(
        subscribeToThemeHandler,
        getThemeSnapshotHandler,
        getThemeServerSnapshotHandler,
    );

    const setThemeHandler = useCallback(
        (newTheme: ThemeType) => updateThemeStoreHandler(newTheme),
        [],
    );

    const value = useMemo(
        () => ({
            onSetTheme: setThemeHandler,
            resolvedTheme,
            theme,
        }),
        [
            theme,
            setThemeHandler,
            resolvedTheme,
        ],
    );

    useEffect(
        () => {
            initializeThemeStoreHandler();

            const mediaQuery = window.matchMedia(componentStringsData.prefersColorSchemeDark);

            const changeHandler = () => {
                if (themeStore.theme === ThemeEnum.SYSTEM) {
                    const resolved = getSystemDarkHandler() ? ThemeEnum.DARK : ThemeEnum.LIGHT;

                    themeStore = {
                        ...themeStore,
                        resolved,
                    };

                    document.documentElement.classList.toggle(
                        ThemeEnum.DARK,
                        resolved === ThemeEnum.DARK,
                    );

                    notifyListenersHandler();
                }
            };

            mediaQuery.addEventListener(
                EventNameEnum.CHANGE,
                changeHandler,
            );

            return () => mediaQuery.removeEventListener(
                EventNameEnum.CHANGE,
                changeHandler,
            );
        },
        [],
    );

    return (
        <ThemeContext.Provider value={value}>
            <MotionConfig reducedMotion={constantsData.motionValues.user}>{children}</MotionConfig>
        </ThemeContext.Provider>
    );
};
