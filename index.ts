import fs from 'fs';
import {FeedParser, FeedSource} from './index.d';

const Parser = require('rss-parser');
const parser: any = new Parser();

if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
}

fs.readdirSync('.')
    .filter((file: string) => file.startsWith('parser-'))
    .forEach((file: string) => {
        const p: FeedParser = require('./' + file + '/index.ts').default;
        p.urls.forEach((url: { name?: string, url: string, prefixRealName?: boolean }) => {
            const f = file + (url.name !== undefined ? '-' + url.name.toLowerCase() : '');
            console.log('Fetching ' + f.replace('parser-', ''));
            parser.parseURL(url.url).then((feed: any) => {
                const source: FeedSource = <FeedSource>(<unknown>p.parse(feed));
                if (url.prefixRealName) {
                    source.name = p.name + ' ' + source.name;
                }
                if (source.name === '') {
                    console.log('Something went wrong with ' + f.replace('parser-', ''));
                }
                fs.writeFileSync('data/' + f.replace('parser-', '') + '.json', JSON.stringify(source, null, 2));
            });
        });
    });