# Project NFT-es

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Install

    $ git clone git@bitbucket.org:logicon15/nftes-node-backend.git
    $ cd NFTES-ES
    $ npm install


## Running the project for

    $ npm run server:local //for local
    $ npm run server:dev //for development
    $ npm run server:prod  for production

## Node server status codes details

    $ 404 => recode not found.
    $ 403 => validation error.
    $ 201 => record created.
    $ 200 => success response.
    $ 406 => server validation error.
    $ 500 => server error.
 