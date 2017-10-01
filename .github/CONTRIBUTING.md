# Contributing

Thanks for thinking about contributing! The following is some information to get up and running, how to add new parsers and how to test newly added features.

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
