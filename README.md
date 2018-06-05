# Frontend Boilerplate
Starting a web project these days is time consuming. With all the build tools and package managers to configure, plus all of the generic code we need to include by default like a solid htaccess file - let's make it less daunting!

[Demo](http://mcnamee.github.io/frontend-boilerplate/)

### Tooling
- [Laravel Mix (Webpack)](https://github.com/JeffreyWay/laravel-mix)
- [SASS](http://sass-lang.com/)
- [Browser Sync](https://browsersync.io/)

### Frontend libraries
- [Bootstrap v4](http://getbootstrap.com/)
- [jQuery](https://jquery.com/)

### Code Styleguides
- [JavaScript](https://github.com/airbnb/javascript)
- [CSS/Sass](https://github.com/airbnb/css)

---

## Installing

```bash
# Clone the repo
git clone https://github.com/mcnamee/frontend-boilerplate.git

# Install dependencies
npm install

# Compile assets to /dist directory
npm run dev
```

---

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Compiles/copies assets to /dist |
| `npm run watch` | Watches your directory and compiles/copies assets to /dist each time you press save on a file |
| `npm run production` | Compiles/minifies/copies assets to /dist ready for production |
| `npm run lint-js` | Provides a report on your JS, against the code styleguide |
| `npm run deploy` | Deploys site to Github Pages |
