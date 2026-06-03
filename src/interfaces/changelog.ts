export interface VersionEntryInterface {
    date: string,
    entries: string[],
    fullChangelogUrl: string | null,
    title: string | null,
    version: string,
    versionRange: string | null,
}
