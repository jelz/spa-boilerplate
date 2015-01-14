# spa-boilerplate

Boilerplate for Single Page Applications built on top of AngularJS and `browserify`. Covers building application in separate environments, dependency management, directory structure and coding conventions.

### Live demo...

[...is here](http://spa.elzbieciak.pl)

### Browser libraries included by defaut

In-browser dependencies are managed by `bower`. By default boilerplate uses:
  - AngularJS 1.3
  - jQuery 2.1 (can be removed if not needed)
  - `angular-ui-router` bower package

To install additional libraries, use `bower` with `--save` flag and edit `concat:vendor` task in `Gruntfile.js`. After adding any new library, you have to run `grunt vendor` again.

```sh
$ bower install --save moment.js
```

### Build system

Code is organized in CommonJS modules. These are bundled altogheter by `browserify`. Build tasks are defined in `Gruntfile.js`. Default `grunt` task runs server on `localhost:8000` and automatically rebuilds application on any source change. Rebuilded application is pushed into browser right away (livereload).

Significant tasks:

  - `grunt build-dev`, `grunt build-prod` - build application in `dev`/`prod` mode
  - `grunt lint` - lint project using `.jshintrc` file (default included in project)
  - `grunt vendor` - reinstall and rebundle JavaScript vendors
  - `grunt publish` - synchronize `public/` with S3 bucket
  - `grunt` - serve application with livereload

When extending `Gruntfile.js` with other `npm` packages, use `--save-dev` flag:

```sh
$ npm install grunt-contrib-sass --save-dev
```

CSS bundle is created by concatenation of all CSS files in `lib/` dictionary.

### Directory structure

  - `config/` - configuration files
  - `fronts/` - raw versions of `*.html` files
  - `lib/{module-name}/` - module files (`*.js`, `*.css`, `*.html`)
  - `lib/{module-name}/tpl` - templates (`*.html`) for module, these can be required as string (`require('./tpl/list.html`)
  - `lib/{module-name}/controllers`, `lib/{module-name}/directives` - AngularJS specific code
  - `public/` - bundled application files, can be used as webroot or synchronized with some cloud storage (eg. S3 bucket)

### Getting started

You only have to have node.js installed. `bower` and `browserify` are installed locally.

```sh
$ git clone git@github.com:jelz/spa-boilerplate.git
$ cd spa-boilerplate
$ cp config/config.json.dist config/config.json
$ npm install
$ grunt
```

### Adding new module

  - create `lib/{module-name}/` directory with `index.js` file in there
  - create AngularJS module in this file, export it from the module (`module.exports = ...;`)
  - update `lib/app/modules.js`, add dependency to main AngularJS module in `lib/app/index.js`
  
### S3 synchronization

Use `grunt publish` to push code into S3 bucket. Provide AWS credentials and configuration in `config/aws.json`.

```sh
$ cp config/aws.json.dist config/aws.json
$ vi config/aws.json
$ grunt publish
```

Only changed files will be pushed. Bucket has to exist. No policy or website configuration will be added.

### License

MIT
