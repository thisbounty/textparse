const execSync = require('child_process').execSync;
const os = require('os');
var buildCommand = "neutrino build";
var serverCommand = "BABEL_ENV=node babel-node server/index.js";
var commandDelimeter ='; ';

if(os.platform() == 'win32') {
  buildCommand = "neutrino build";
  serverCommand = "SET BABEL_ENV=node&& babel-node server/index.js";
  commandDelimeter = '& ';
}

execSync(buildCommand+commandDelimeter+serverCommand, {stdio:[0,1,2]});
