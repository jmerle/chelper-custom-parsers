import parsers from './parsers/parsers';
import matchPatternToRegExp from './vendor/match-pattern-to-regexp';

const url = window.location.href;

// Checks every parser to see if any of their match patterns match the current url
parsers.forEach((parser) => {
  const patterns = parser.getMatchPatterns();
  const hasMatchingPattern = patterns.some(p => matchPatternToRegExp(p).test(url));

  if (hasMatchingPattern) parser.load();
});
