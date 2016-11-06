# Frontend Boilerplate
Starting a web project these days is time consuming. With all the build tools and package managers to configure, plus all of the generic code we need to include by default like a solid htaccess file - let's make it less daunting!

[Demo Demo Demo](http://mcnamee.github.io/frontend-boilerplate/dist/)

### Tools we're using
- [NodeJS / NPM](https://nodejs.org/en/)
- [Gulp](http://gulpjs.com/)
- [SASS](http://sass-lang.com/)
- [Browser Sync](https://www.browsersync.io/)
- [SCSS-Lint](https://github.com/brigade/scss-lint)

### Frontend libraries
- [Bootstrap](http://getbootstrap.com/)
- [jQuery](https://jquery.com/)

### Code Styleguides
- [JavaScript](https://github.com/airbnb/javascript)
- [CSS/Sass](https://github.com/airbnb/css)

***

### Features

| Feature                                | Summary |
|---|---|
| Responsive boilerplate                 | A [Bootstrap](http://getbootstrap.com) responsive boilerplate optimized for all devices. |
| SASS                                   | Compile [Sass](http://sass-lang.com/) into CSS very easily with a single command. |
| A+ Performance                         | All JavaScript, CSS and HTML are minified and concatenated for fast page loads. All images are also optimised for best performance! |
| HTTP Server                            | Need to get up quickly? Use the built in HTTP server. Want to use this with a PHP site? Use the built in proxy - just change a URL in the Gulp file. |
| Live multi-device Browser Reloading    | Watch as you save files and your all browser/s reload automatically. Powered by [BrowserSync](http://browsersync.io). |
| Deploy Option                          | FTP deploy built in, so that you can very easily deploy to any type of host with a single command. |
| SCSS Linting                           | Using the AirBnB CSS/SASS Styleguide, we've got a SCSS-Lint configuration file ready to lint. Install the [SCSS-Lint Gem](https://github.com/brigade/scss-lint#installation) + install a linter into your IDE (eg. For Sublime Text 3: SublimeLinter + SublimeLinter-contrib-scss-lint) |
| JS Linting                             | Using the AirBnB JS Styleguide, we've got both the gulp task linting on each save + the config there for your on-demand IDE linting. (Install the linter into your IDE (eg. For Sublime Text 3: SublimeLinter + SublimeLinter-contrib-eslint)) |
| Pagespeed Insights                     | See how well your code is performing - add your public URL to the pagespeed task in the gulp file and run `gulp pagespeed` |

***

## 1.0 Installing
1. `git clone https://github.com/mcnamee/frontend-boilerplate.git`
2. `npm install` or if you're using [Yarn](https://yarnpkg.com/): `yarn`
3. If you're using this with a web server (eg. a PHP site), edit /gulpfile.js - within the BrowserSync task, comment out the `server:..` line, un-comment the `proxy:..` line and change the URL of the proxy to your web server.

***

## 2.0 Developing
Because we're using SASS and also because we want our resulting code to be A+ performant, we'll be using [Gulp](http://gulpjs.com/) as our build tool, to do the following for us:
- Convert our SASS to CSS and minify it to 1 small file - outputting to `/dist/assets/theme.css`
- Concatinate and minify our JS plugins/dependencies to 1 small file - outputting all plugins to `/dist/assets/plugins.js`
- Concatinate and minify our JS to `/dist/assets/theme.js`
- Transform our custom JS from ES2015+ code to work in our browser
- Lint our JS - showing errors in the terminal if our custom JS doesn't conform to our styleguide
- Optimize all of the images in our src/img directory and put the result into `/dist/assets/img/`
- Minify our HTML and place it in `/dist/`
- Get all our assets and place them into the `/dist/` folder, ready for deployment
- Fire up [Browser Sync](https://www.browsersync.io/), and whenever you Save a SASS file for example, it'll automatically run the commands above and refresh any browser that has the development URL opened

### 2.1 Structure
All source code is contained in the `/src` folder. When running the main `gulp` command, the code intended for distribution to production, is built into the `/dist` folder. You can then pick up the `dist` folder and put it on your server (more on that in 3.0).

### 2.2 Running
1. `gulp`
2. In the command line, BrowserSync will give you 'Access URLs' - simply copy/paste the 'External' URL it provides into your browser as well as any other device on your network, and watch the magic.
3. Press Save on any HTML, SCSS or JS file and watch as all of your browsers auto refresh

***

## 3.0 Deploying
- [AWS S3](https://github.com/yeoman/generator-webapp/blob/master/docs/recipes/aws-s3-deployment.md)
- [GitHub Pages](https://github.com/yeoman/generator-webapp/blob/master/docs/recipes/gh-pages.md)
- [Heroku](https://github.com/yeoman/generator-webapp/blob/master/docs/recipes/node-heroku.md)
- [Firebase](https://github.com/google/web-starter-kit/blob/master/docs/deploy-firebase.md)
- Shared Hosting via FTP:

Not everyone deploys to their own server on AWS. Believe it or not, some of us use shared hosting!
I like the simplicty of being able to build from Gulp, and deploy straight from there - introducing [FTP for Gulp](https://github.com/morris/vinyl-ftp)

### 3.1 Initial Setup
1. Rename `ftp-credentials-SAMPLE.js` to `ftp-credentials.js`
2. On the respective lines, add your FTP username, password and hostname (don't worry, these credentials will only live on your computer - the file is .gitignored, so won't be version tracked and won't be sent to the server)

### 3.2 Deploy
1. From the command line, simply type: `gulp deploy` - which will run the full build process (placing everything into `/dist`) and once done, FTP it to your host.
