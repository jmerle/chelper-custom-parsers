import fs from 'fs';
import path from 'path';
import parsers from './parsers/parsers';

export default function getHeader(dev) {
  const packageData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'));

  const fields = [
    ['name', 'CHelper Custom Parsers' + (dev ? ' Dev' : '')],
    ['namespace', 'https://github.com/jmerle'],
    ['version', packageData.version],
    ['description', packageData.description],
    ['author', packageData.author],
  ];

  parsers
    .map(p => p.getMatchPatterns())
    .reduce((acc, val) => acc.concat(val))
    .forEach(p => fields.push(['match', p]));

  if (dev) {
    const absolutePath = path.resolve(__dirname, '../dev/main.js').replace(/\\/g, '/');
    fields.push(['require', `file:///${absolutePath}`]);
  } else {
    const url = 'https://raw.githubusercontent.com/jmerle/chelper-custom-parsers/master/chelper-custom-parsers.user.js';
    fields.push(['updateURL', url]);
    fields.push(['downloadURL', url]);
  }

  fields.push(['grant', 'none']);

  const fieldLines = fields.map(field => `// @${field[0]}${' '.repeat(13 - field[0].length)}${field[1]}`).join('\n');

  return `
    // ==UserScript==
    ${fieldLines}
    // ==/UserScript==
  `.trim().split('\n').map(line => line.trim()).join('\n');
}
