export interface FeedParser {
    name: string,
    urls: Array<{ name?: string, url: string, prefixRealName?: boolean }>,
    parse: (feed: any) => void
}

export interface FeedSource {
    name: string,
    description: string,
    link: string,
    language: string,
    feed: Array<FeedItem>
}

export interface FeedItem {
    title: string,
    description: string,
    link: string,
    categories: Array<string>,
    date: string
}