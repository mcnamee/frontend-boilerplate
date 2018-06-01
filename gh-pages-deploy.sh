#!/bin/sh
npm run production;
git add dist/* && git commit -m 'Deploy to GitHub Pages';
git subtree push --prefix build origin gh-pages;
