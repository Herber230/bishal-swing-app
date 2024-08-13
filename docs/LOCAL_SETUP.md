# Local Setup

This section is intended to provide the necessary information to set up the project in the local machine. This includes the requirements to run the project, the installation steps, and the basic commands to run the project in the local machine.

---

## Requirements

> **NOTE** The following section only contain an small description and brief technical details to verify the requirements. For more detailed information, please refer to the **[KNOWLEDGE_BASE](./KNOWLEDGE_BASE.md)** section of these documents.

### Terminal

The terminal is a command-line interface that allows to interact with the operating system using text commands. This is the main tool to run the project in the local machine. The terminal depends on the operating system and it is already installed in the local machine. The only thing that is important is to know how to open the terminal in the operating system and start to familiarize with the commands and the tools that are available.

For windows, the terminal is called Command Prompt or PowerShell. For Mac OS, the terminal is called Terminal. For Linux, the terminal is called Terminal or Konsole. The terminal can be opened using the search bar in the operating system or using a keyboard shortcut.

- **Windows** The terminal can be opened using the `Win + R` keys and typing `cmd` or `powershell`.
- **Mac OS** The terminal can be opened using the `Cmd + Space` keys and typing `terminal`.
- **Linux** The terminal can be opened using the `Ctrl + Alt + T` keys.

### Node.js

JavaScript is a programming language that works in the web browser, so in order to run JavaScript in our development environment, we need a runtime environment that can execute JavaScript code. Node.js is that software that allows us to write code in TypeScript or JavaScript and run it in our local machine.

Something that is really important is that Node.js versions are always in evolution, so it is important to have a way to move from one version to another. This can be done using a version manager like NVM. This allows to have multiple versions of Node.js installed in the local machine and switch between them easily.

To install NVM you can follow the instructions here:

- [NVM Installation](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)

And also check the official documentation if necessary:

- [NVM Source Code](https://github.com/nvm-sh/nvm)

To verify you already have NVM installed you can run the following command:

```bash
nvm --version
```

And you should see the version of NVM installed in your local machine. This version is not a restriction itself, it means all in the team can have a different version for this. For example:

```bash
0.39.5
```

After this you can install Node.js using NVM. To do this you can run the following command:

```bash
nvm install 22.4.0
```

Then you must to set the Node.js version to be used in the local machine. This can be done using the following command:

```bash
nvm use 22.4.0
```

Finally you can verify the Node.js version using the following command:

```bash
node --version
```

### Git and GitHub

Git is a software that allows us work collaboratively in a project. Basically it provides a mechanism to work with files and folders in multiple computers and keep track of the changes made by the team. This is a very powerful tool that allows to work in a team and keep the codebase in a good state.

It is really important to show the differences with GitHub, because GitHub is a platform that provides a lot of features to work with Git. So, in order to work with Git, it is necessary to have a GitHub account. This is a free account that allows to work with public repositories and private repositories. In GitHub we can create a repository, add collaborators, create branches, create pull requests, and more.

To install Git you can follow the instructions here:

- [Git Installation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

After installing Git you can verify the installation using the following command:

```bash
git --version
```

And you should see the version of Git installed in your local machine. This version is not a restriction itself, it means all in the team can have a different version for this.

The most complicated thing about the local environment is to set the GitHub authentication, we need to let GitHub know who we are and this setting depends on the Operating System. This can be done using SSH key authentication. This can be done following the instructions in the

[Official GitHub documentation for SSH](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)

> **NOTE** This section can be improved with more detailed information about the installation and the configuration of Git and GitHub. Collaborators can add more information about this topic.

### PNPM

PNPM is a tool that requires the previous installation of Node.js. It is a package manager that allows to install the dependencies of the project. This is a very powerful tool that provides a lot of features out of the box, like installing the dependencies, updating the dependencies, and more.

In the same way as Node.js, PNPM requires an strict version to work with. This can be done using the following command:

```bash
npm install -g pnpm@9.5.0
```

Then you can verify the PNPM version using the following command:

```bash
pnpm --version
```

For more information about PNPM you can check the official documentation:

- [PNPM](https://pnpm.io/)

### Visual Studio Code

At the very end, programming is about to write different type of code in different type of files. For this there are a lot of tools that can be used to write code, but one of the most popular tools is Visual Studio Code. This is a code editor that provides a lot of features to write code, like syntax highlighting, code completion, code snippets, and more.

You can install Visual Studio Code using the following link:

- [Visual Studio Code](https://code.visualstudio.com/download)

Visual Studio Code provide a cool feature that is the integration with the terminal. This means that you can open the terminal inside Visual Studio Code and run the commands directly from the editor. This is a very powerful feature that allows to work with the code and the terminal in the same place.

---

## Installation

The following list can be checked to verify the requirements are installed in the local machine:

- [x] Terminal
- [x] Node.js version 22.4.0
- [x] Git installed and configured with SSH key authentication to GitHub
- [x] PNPM version 9.5.0
- [x] Visual Studio Code

Using the terminal, the following steps can be followed to install the project in the local machine:

1. Clone the repository using the command below. This will download the source code of the project to the local machine. In other words, it will create a folder with the name of the project and download the files to that folder.

```bash
git clone git@github.com:Herber230/bishal-swing-app.git
```

2. Change to the project directory. This will move the terminal to the folder that was created in the previous step.

```bash
cd bishal-swing-app
```

3. Install the dependencies. This will download the dependencies of the project to the local machine, and a `node_modules` folder will be created in the project directory. For more information about the dependencies, you can check the **[KNOWLEDGE_BASE](./KNOWLEDGE_BASE.md)** section of these documents.

```bash
pnpm install
```

4. Run the development server. This will start the development server and the project will be available in the browser. For more information about the development server, you can check the **[KNOWLEDGE_BASE](./KNOWLEDGE_BASE.md)** section of these documents.

```bash
pnpm run dev
```

5. Open the browser and navigate to the following URL:

```
http://localhost:3000
```