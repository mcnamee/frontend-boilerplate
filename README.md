# Frontend Boilerplate
Starting a web project these days is time consuming. With all the build tools and package managers to configure, plus all of the generic code we need to include by default like a solid htaccess file - let's make it less daunting!

### The tools we're using
- [NodeJS / NPM](https://nodejs.org/en/)
- [Bower](http://bower.io/)
- [Gulp](http://gulpjs.com/)
- [Git Deploy PHP](https://github.com/BrunoDeBarros/git-deploy-php)
- [SASS](http://sass-lang.com/)
- [Browser Sync](https://www.browsersync.io/)
- [PHP Server](https://www.npmjs.com/package/gulp-connect-php)

### The frontend libraries
- [Bootstrap](http://getbootstrap.com/)
- [jQuery](https://jquery.com/)

***

## 1.0 Installing
1. `git clone https://github.com/mcnamee/frontend-boilerplate.git`
2. `npm install`
3. `bower install`
4. Edit /gulpfile.js - find: `proxy: "localhost..."` and replace localhost with the URL that you'll be using for development. This repo comes setup with a portable PHP web server. Although you can simply comment out the `php.server({...` line in gulpfile.js to use your own. This allows you to work on a dynamic PHP site for example, as it'll proxy through the source.

***

## 2.0 Developing
Because we're using SASS and also because we want our resulting code to be A+ performant, we'll be using [Gulp](http://gulpjs.com/) as our build tool, to do the following for us:
- Convert our SASS to CSS and minify it to 1 small file - outputting to `/dist/theme.css`
- Concatinate and minify our JS to 1 small file - outputting to `/dist/theme.js`
- Optimize all of the images in our src/img directory and put the result into `/dist/img/`
- Fire up [Browser Sync](https://www.browsersync.io/), and whenever you Save a SASS file for example, it'll automatically run the commands above and refresh any browser that has the development URL opened

### 2.1 Running
1. `gulp`
2. In the command line, BrowserSync will give you 'Access URLs' - simply copy/paste the 'External' URL it provides into your browser as well as any other device on your network, and watch the magic.
3. Press Save on any SCSS or JS file and watch as all of your browsers auto refresh

***

## 3.0 Deploying
Not everyone deploys to their own server on AWS. Believe it or not, some of us use shared hosting!
I've like the simplicity of [Git Deploy PHP](https://github.com/BrunoDeBarros/git-deploy-php) as you can very easily deploy, and continue to re-deploy through a simple command.

### 3.1 Initial Setup
1. Rename `deploy-sample.ini` to `deploy.ini`
2. On the respective lines, add your FTP username, password and hostname (don't worry, these credentials will only live on your computer - the file is .gitignored, so won't be version tracked and won't be sent to the server)

### 3.2 Deploy
1. From the command line: `php git-deploy`
2. Make more changes locally, commit to git, and when you're ready to deploy - run the command again

Checkout the [Git Deploy PHP](https://github.com/BrunoDeBarros/git-deploy-php) repo for more details. You can also do things like:
- Have a multiple environments - so you can `php git-deploy staging` to send to a staging server for example
- Revert changes
