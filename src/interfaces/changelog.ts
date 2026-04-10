export interface VersionEntryInterface {
    date: string,
    entries: string[],
    fullChangelogUrl: string | null,
    isRelease: boolean,
    title: string | null,
    version: string,
    versionRange: string | null,
}
