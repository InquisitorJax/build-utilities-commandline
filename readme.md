# Build Utilities Commandline

This project is build in order to develop web applications with aurelia and includes the following features

1. Easily create new aurelia projects with service worker support
1. Create new classes with tests
1. Create new aurelia components with tests
1. Create new aurelia views with tests

All the functions are commandline executed, for help on what actions are supported you can use the -h argument.

# Installing
Run the following npm command to install build utilities online globally.

`npm install build-utilities-commandline -g`

# Using
Once installed you can run build utilities online using the `bucli` command.

Example: `bucli -h`

# New Project
When creating a new project, please note the following.

1. Navigate in your terminal to the folder where you want to create the project
1. All files will be compied relative to the folder you are in
1. Run `bucli -n project` to create the new project
1. You need to run `npm install` after the files are copied
1. You also need to run `jspm install -y`
1. After this you can compile your project using `bucli -c all` and run it in a webserver

# Hosting your project
No default host is provided but we recommend you install and use http-server as it is the simplest to use.  
If you are looking for a easy to use http2 server you can try simplehttp2server.

The new project's package.json assumes you have http-server installed so if you use something else you may want to update the scripts in your projects package.json file.

# Testing
Testing is configured on a project level and not part of the bucli.  
Projects created with bucli will have testing and code coverage configured.  
There is a npm script in package.json to run tests and by defaults includes code coverage.

Running the npm script is the same as running any other npm script: `npm run test`.

# UI Testing
UI testing is done using selenium so you will need the appropriate dirver to use.
We use chrome as the default configuration meaning that you will need to have the chrome driver in a path on your machine or in the project folder.

You can download the driver at:  
https://chromedriver.storage.googleapis.com/index.html?path=2.30/
