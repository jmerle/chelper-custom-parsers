import Parser from './Parser';
import Task from '../models/Task';
import Test from '../models/Test';

export default class HackerRankParser extends Parser {
  /**
   * Returns the match patterns this parser can handle.
   * More information on match patterns: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Match_patterns.
   */
  getMatchPatterns() {
    return ['https://www.hackerrank.com/*'];
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
    /*
     * HackerRank doesn't open pages like normal websites do, so a MutationObserver
     * is required to be able to know when a new page might have loaded.
     */
    const observer = new MutationObserver(() => this.check());

    const config = {
      attributes: false,
      childList: true,
      characterData: false,
    };

    observer.observe(document.body, config);
    observer.observe(document.getElementById('content'), config);
  }

  /**
   * Checks whether the currently loaded page is a problem page.
   * If that happens to be the case, it calls initProblemPage().
   */
  check() {
    const url = window.location.href;

    if (url.endsWith('/problem') || /^https:\/\/(www[.])?hackerrank[.]com\/(contests\/.+\/)?challenges\/[^/]+$/.test(url)) {
      this.initProblemPage();
    }
  }

  /**
   * Adds the necessary Send to CHelper button to the page.
   */
  initProblemPage() {
    if ($('li#problemTab').length === 0) {
      setTimeout(this.initProblemPage, 50);
      return;
    }

    if ($('#chelper-parse').length === 1) return;

    const task = this.parseTask();

    const isContest = $('ol.bcrumb li:first-child a').attr('href') === '/contests';
    const button = `<button class="btn" id="chelper-parse" style="margin-bottom: ${isContest ? 0 : 20}px;">Parse with CHelper</button>`;

    $('.challenge-sidebar').css('margin-top', 0);
    $('.challenge-sidebar').prepend(button);

    $('#chelper-parse').on('click', () => this.sendTask(task));
  }

  /**
   * Parse the current problem page into a Task object.
   */
  parseTask() {
    const taskName = $('.challenge-view h2:first').text().trim();

    const breadCrumbs = $('ol.bcrumb li').map((i, e) => $(e).find('a span').text()).toArray();
    const contestName = ['HackerRank', ...breadCrumbs.slice(1, -1)].join(' - ');

    const tests = [];

    $('.challenge_sample_input pre, .challenge_sample_output pre').each((i, e) => {
      const content = $(e).text();

      if (i % 2 === 0) {
        tests.push(new Test(content, ''));
      } else {
        tests[tests.length - 1].setOutput(content);
      }
    });

    return new Task(taskName, contestName, tests, 512);
  }
}
