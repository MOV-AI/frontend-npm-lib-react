# MOVAI-Lib-React

![Movai](https://www.mov.ai/wp-content/uploads/2021/06/MOV.AI-logo-3.png)

The Mov.AI's frontend components library.
Here we place all reusable/common components, such as buttons, icons, textfields, etc.
Its main use will be to build Mov.AI applications.

# Table of Content

<!-- TOC -->
* [MOVAI-Lib-React](#movai-lib-react)
* [Table of Content](#table-of-content)
* [Setting Up Your Development Environment](#setting-up-your-development-environment)
    * [Common Configuration](#common-configuration)
      * [Configure ~/.npmrc](#configure-npmrc)
    * [Using a DevContainer (recommended)](#using-a-devcontainer-recommended)
    * [Using a Local Setup](#using-a-local-setup)
      * [Tools Required](#tools-required)
      * [Install Node with NVM](#install-node-with-nvm)
      * [Install PNPM](#install-pnpm)
    * [Using a DevContainer Setup](#using-a-devcontainer-setup)
      * [Tools Required](#tools-required-1)
* [Development](#development)
  * [How to install this library to an app](#how-to-install-this-library-to-an-app)
  * [How to Link this library locally to an App](#how-to-link-this-library-locally-to-an-app)
<!-- TOC -->

# Setting Up Your Development Environment

You can set up your development environment in two ways:
- In a DevContainer (recommended)
- Locally

### Common Configuration

#### Configure ~/.npmrc

Ensure that your ~/.npmrc file is configured with the necessary access tokens. The file should look like this:

```
//npm.pkg.github.com/mov-ai/:_authToken=GITHUB_TOKEN
@mov-ai:registry=https://npm.pkg.github.com/mov-ai/
always-auth=false
engine-strict=true
//registry.npmjs.org/:_authToken=GITHUB_TOKEN
//npm.pkg.github.com/:_authToken=GITHUB_TOKEN
```

Replace GITHUB_TOKEN with your actual token.

### Using a DevContainer (recommended)

1. Clone the app and libraries (if needed) to `$HOME/movai/src/feapps`

2. Open the project in VS Code and reopen in container:

   Open the project directory in VS Code. You should be prompted to reopen the project in a container. Accept this prompt.

### Using a Local Setup

#### Tools Required

- [Node](https://nodejs.org/)
- [NVM](https://github.com/nvm-sh/nvm)
- [PNPM](https://pnpm.io/)

#### Install Node with NVM

To install Node.js using `nvm` (Node Version Manager), follow these steps:

1. **Install `nvm`:**

   Open your terminal and run the following command to install `nvm`:

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
    ```

2. **Load `nvm`:**

   After installing `nvm`, you need to load it. Close and reopen your terminal, or run:

    ```bash
    source ~/.nvm/nvm.sh
    ```

3. **Install the required Node.js version:**

   With `nvm` installed and loaded, run the following command to use the required Node.js version:

    ```bash
    nvm install && nvm use # uses the node version specify in the .nvmrc file
    ```

   You might need to install it before using it:
    ```bash
    nvm install
    ```

4. **Set the used Node.js as the default version:**

    ```bash
    nvm current # prints the node.js version being used
    nvm alias default xx.xx.x # sets xx.xx.x as default
    ```

5. **Verify the installation:**

    ```bash
    node -v
    ```

   This should output the node version specified in `.nvmrc` file.


#### Install PNPM

To install `pnpm`, follow these steps:

1. Using the required pnpm version:

   The pnpm version required is specify in the `package.json` file as:
    ```json
    {
      "packageManager": "pnpm@x.x.x"
    }
    ```
   In order to have Node.js use the specified version, run:
    ```bash
   corepack enable
    ```
   Upon first use, Corepack downloads the latest version from the network and uses it when running pnpm commands.

### Using a DevContainer Setup

#### Tools Required

- [Docker](https://www.docker.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers (VS Code Extension)](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

# Development

## How to install this library to an app

1. - Install package:
 ```bash
 "pnpm install @mov-ai/mov-fe-lib-react"
 ```

## How to Link this library locally to an App

You might want to work with this library while seeing the changes in an app. In order to do so, you'll have to provide a path to a local directory that contains this library package.
Here's how it can be done:

1. In the app, identify this library in the `package.json`:

    ```
    "@mov-ai/mov-fe-lib-react": "^x.x.x-X",
    ```

2. Replace the library version with the path of this local library:

    ```
   "@mov-ai/mov-fe-lib-react": "file:/home/username/path/to/library/frontend-npm-lib-react"
    ```

3. Build this local library:

    ```bash
   pnpm install  # installs dependencies
   pnpm buildDev # builds the app and watches for changes
    ```

4. Install and build the app:

    ```bash
   pnpm install  # installs dependencies including the local library
   pnpm start    # runs the app
    ```