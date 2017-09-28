import Parser from './Parser';
import Task from '../models/Task';
import Test from '../models/Test';

export default class ExampleParser extends Parser {
  /**
   * Returns the match patterns this parser can handle.
   * More information on match patterns: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Match_patterns.
   */
  getMatchPatterns() {
    return [];
  }

  /**
   * If one of the match patterns match, this function is called.
   * If it returns true, this parser will be used. Useful for contest parsers in
   * which the URL patterns can not detect whether a contest has already started or not.
   */
  canHandlePage() {
    return true;
  }

  /**
   * When a match pattern matches with the current page
   * and canHandlePage returns true, this method is called.
   */
  load() {
    const taskName = 'Fancy Task';
    const contestName = 'Fancy Contest';

    const tests = [
      new Test('1 1', '2'),
      new Test('2 2', '4'),
      new Test('3 3', '6'),
    ];

    const memoryLimit = 512;

    const task = new Task(taskName, contestName, tests, memoryLimit);

    // This sends the task to CHelper
    this.sendTask(task);
  }
}
