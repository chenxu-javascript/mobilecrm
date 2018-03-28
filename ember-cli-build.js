'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
var env = process.env.EMBER_ENV;
console.log(env);
module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    'ember-cli-babel': {
      includePolyfill: true
    },
    babel: {
      sourceMaps: 'inline',
      plugins: ['transform-decorators-legacy', 'transform-object-rest-spread']
    },
    'ember-cli-qunit': { // turn off jshint
      useLintTree: false
    },
    eslint: {
      enabled: env != 'production',
      testGenerator: 'qunit',
      group: true,
      rulesDir: 'eslint-rules',
    },
    sourcemaps: {
      enabled: false
    },
    autoprefixer: {
      browsers: ["> 1% in CN", "last 2 versions"]
    },
    storeConfigInMeta: false,
    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'jpeg', 'gif', 'svg']
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
