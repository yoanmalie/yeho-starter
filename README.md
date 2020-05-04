# Boilerplate - starter

A simple and basic starter suited for all (non js framework based) project, with Gulp + Webpack.  
It basically handle SCSS, JS, Fonts and images compression (and keep a static folder).

**Update this Readme file to suit your project.**

## Information

The project root where the index.html file belong to is set to `/public`, you can change the configuratin in the `/gulp_tasks/_helpers.js` file.  
After a git pull, you probably need to run `npm install` in case new dependencies are required.  
**Note:** During a Git commit, there is scripts who are running automatically like Prettier, Stylelint and ESLint to fix the code style and formatting.

## Installation

### Prerequisites

Please, have an up-to-date version of:

-   [Git](https://git-scm.com/)
-   [Node.js + NPM](https://nodejs.org/en/download/)
-   [Gulp CLI](https://gulpjs.com/docs/en/getting-started/quick-start/#install-the-gulp-command-line-utility)

### Steps

1. Clone the repository:

```bash
git clone git@github.com:yoanmalie/yeho-starter.git
```

2. Launch the installation of dependencies:

```bash
npm install
```

3. If you use a vhost, copy the `.example.vhost.js` file and name it `.vhost.js` and type your vhost URL inside.

4. Create necessary assets files for the project:

```bash
gulp build
```

Or, the same thing but with a Watch and a Sync which will rerun the tasks again and refresh the browser when there is updated files:

```bash
gulp serve
```

## Available commands

To know the available NPM and Gulp commands, run:

```bash
npm run # package.json scripts
gulp --tasks # Gulp tasks with details
gulp --tasks-simple # Gulp task simplified
```

### Environments

By default everything is built for a `--development` environment so assets files are not minified and use the sourcemap, etc.  
If you want to build for a production environment, use the `--production` flag when you run a Gulp command.

### Browsers

Browsersync open Google Chrome by default, you can use Firefox instead by using the `--firefox` flag when you run the `gulp sync` task or the `gulp serve` one.

## Know problems:

:warning: Check your used versions of Git, Node.js, NPM and Gulp CLI.

### Node.js

Sometime, problems with Node.js can be simply be solved by cleaning the cache with `npm cache clean`.

### Related to Browsersync

`Cannot get/` appear? There is a problem with the vhost. Check if you didn't make a typo in the `.vhost.js` file and if this vhost URL work well too on your machine.

If you meet the error `Error: listen EADDRINUSE`, stop the Gulp process in your operating system.
Please note to care about if you stop the current running command, do it with <kbd>CTRL</kbd> + <kbd>C</kbd>.
