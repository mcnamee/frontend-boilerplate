# Frontend Boilerplate
Starting a web project these days is time consuming. With all the build tools and package managers to configure, plus all of the generic code we need to include by default like a solid htaccess file - let's make it less daunting!

[Demo Demo Demo](http://mcnamee.github.io/frontend-boilerplate/dist/)

### Tools we're using
- [Laravel Mix (Webpack)](https://github.com/JeffreyWay/laravel-mix)
- [SASS](http://sass-lang.com/)

### Frontend libraries
- [Bootstrap v4](http://getbootstrap.com/)
- [jQuery](https://jquery.com/)

### Code Styleguides
- [JavaScript](https://github.com/airbnb/javascript)
- [CSS/Sass](https://github.com/airbnb/css)

---

### Features

| Feature                                | Summary |
|---|---|
| Responsive boilerplate                 | A [Bootstrap](http://getbootstrap.com) responsive boilerplate optimized for all devices. |
| SASS                                   | Compile [Sass](http://sass-lang.com/) into CSS very easily with a single command. |
| A+ Performance                         | All JavaScript and CSS are minified and concatenated for fast page loads. |
| Live multi-device Browser Reloading    | Watch as you save files and your all browser/s reload automatically. |
| SCSS Linting                           | Using the AirBnB CSS/SASS Styleguide, we've got a SCSS-Lint configuration file ready to lint. Install the [SCSS-Lint Gem](https://github.com/brigade/scss-lint#installation) + install a linter into your IDE (eg. For Sublime Text 3: SublimeLinter + SublimeLinter-contrib-scss-lint) |
| JS Linting                             | Using the AirBnB JS Styleguide, we've got both the gulp task linting on each save + the config there for your on-demand IDE linting. (Install the linter into your IDE (eg. For Sublime Text 3: SublimeLinter + SublimeLinter-contrib-eslint)) |

---

## Installing

1. `git clone https://github.com/mcnamee/frontend-boilerplate.git`
2. `npm install`
3. `npm run dev` - the site is now ready in /dist

---

## Developing

| Command | Description |
| --- | --- |
| `npm run dev` | Compiles/copies assets to /dist |
| `npm run watch` | Watches your directory and compiles/copies assets to /dist each time you press save on a file |
| `npm run production` | Compiles/minifies/copies assets to /dist ready for production |

---

## Deploying
- [AWS S3](https://github.com/yeoman/generator-webapp/blob/master/docs/recipes/aws-s3-deployment.md)
- [GitHub Pages](https://github.com/yeoman/generator-webapp/blob/master/docs/recipes/gh-pages.md)
- [Heroku](https://github.com/yeoman/generator-webapp/blob/master/docs/recipes/node-heroku.md)
- [Firebase](https://github.com/google/web-starter-kit/blob/master/docs/deploy-firebase.md)
