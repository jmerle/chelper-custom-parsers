# CHelper Custom Parsers
A userscript which adds custom parsers to CHelper.

## Description
This userscript makes it possible to easily add new parsers to CHelper without modifying it's source or the extension. It works by making CHelper think it is receiving a CSAcademy task, while it is just an HTML body which is made to *look* like how CSAcademy structures their page. The downside is that it won't enable the button the CHelper extension adds to the browser, but you instead need to press on a button visible on the problem's or contest's page.

### Included parsers
- HackerRank: Adds a button to the problem sidebar and fixes the issue of HackerRank not working with CHelper anymore

## Installation
It's a userscript, so you'll need to install a userscript manager. I personally recommend [Tampermonkey](https://tampermonkey.net/) since this userscript doesn't seem to be working very well with Greasemonkey at the moment.

When you got a userscript manager installed, clicking on the following link should show an installation window:  
https://raw.githubusercontent.com/jmerle/chelper-custom-parsers/master/chelper-custom-parsers.user.js

When you have auto-updating turned on in your userscript manager you will automatically receive the latest updates. If you got it disabled, you can simply click the install link again to install the latest updates when they are available.

Since most judges got https enabled, you'll need to manually enable requests to non-http locations (including localhost, which is where the tasks are sent to so CHelper can catch them). In Chrome, when the userscript attempts to send the task to CHelper, a little shield icon will show up in the top-right of the address bar. By clicking on this you can enable "unsafe scripts" for your current session. You can also enable it on Chrome by running Chrome with the `--allow-running-insecure-content` option. Firefox should have similar options.

## Development

### Getting up and running
To add new parsers, a few things have to be done. First, clone or fork the repository and `cd` into the newly created directory. Then, install all the required dependencies with `npm install`.

With the code pulled in and the necessary dependencies installed, you can run `npm run dev` to create a development build in `dev/`. Install the `chelper-custom-parsers-dev.user.js` as a userscript (don't forget to disable the non-dev version while developing!) and make sure `file:///` are allowed to be used by your userscript manager (see the answers to [this](https://stackoverflow.com/questions/9931115/run-greasemonkey-on-html-files-located-on-the-local-filesystem) Stack Overflow question to know how to enable this). After that's done, you can run `npm run watch` to automatically compile the latest changes, which are loaded when you refresh a page in the browser.

### Adding new parsers
To get an idea of how the parsers work, take a look at the HackerRank parser (all parsers can be found in the `src/parsers/` directory).

To add a new parser, copy the ExampleParser to a new file and rename it. Then, add your parser to `src/parser/parsers.js`. This makes sure your parser is loaded and it's match patterns are included in the header. After you've read the note below you can start working on your new parser. The example parser is pretty well documented, but if you need any help, feel free to open an issue!

**Note**: When you change the getMatchPatterns() method of any parser or when you make a change in `src/parser/parsers.js` it is necessary to run `npm run dev` again. After that, update the current content of the `CHelper Custom Parsers Dev` userscript with the data in `dev/chelper-custom-parsers-dev.user.js`. This is necessary because changes in the match patterns require the header to be updated.

### Pull requests
A few things about pull requests:
- Make all pull requests towards the `development` branch
- Make sure any updates you make or parsers you add are thoroughly tested
- When adding parsers, make sure they work on both the challenge and the contest pages of a website (HackerRank for example has different ways to display a contest problem and a non-contest problem)
- If you add new parsers, make sure the button which is used to send the task to CHelper is well visible and easy to spot
- If you add new parsers, make sure to update the README
- Make sure `npm run lint` doesn't show any errors or warnings (Airbnb's styleguide is used, with a few small differences)
- State the changes you made in the pull request's description
