# Knowledge Base

This document is a knowledge base for the project. Basically it contains details and resources about the technologies, concepts and tools used in the project. However, all the details about how to add changes to the project and how the business logic is intended to work are in the `CONTRIBUTING.md` and `ARCHITECTURE.md` documents.

You can navigate through the document using the table of contents.

---

## Table of Contents

- [Concepts](#concepts)
  - [Programming](#programming)
  - [Programming Languages](#programming-languages)
  - [Static and Dynamic Typing](#static-and-dynamic-typing)
  - [Programming Paradigms](#programming-paradigms)
  - [Programming Libraries](#programming-libraries)
  - [Programming Frameworks](#programming-frameworks)
  - [Web Development](#web-development)
- [Technologies](#technologies)
  - [JavaScript](#javascript)
  - [TypeScript](#typescript)
  - [Node.js](#nodejs)
  - [NPM](#npm)
  - [PNPM](#pnpm)
  - [React](#react)
  - [Next.js](#nextjs)
  - [Tailwind CSS](#tailwind-css)
- [Tools](#tools)
  - [Command Line Interface (CLI)](#command-line-interface-cli)
  - [Visual Studio Code](#visual-studio-code)
  - [Git](#git)
  - [GitHub](#github)
- [Useful Websites](#useful-websites)
  - [devdocs.io](#devdocsio)
  - [CodeSignal](#codesignal)
- [File extensions](#file-extensions)

---

## Concepts

### Programming

Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer languages, such as SQL, Java, Python, and C++.

Basically you write code in a programming language that is then translated into machine code by a compiler or interpreter. The machine code is then executed by the computer.

### Programming Languages

A programming language is a formal language comprising a set of instructions that produce various kinds of output. Programming languages are used in computer programming to implement algorithms. Most programming languages consist of instructions for computers, although there are programmable machines that use a limited set of specific instructions, rather than the general programming languages of modern computers.

There are many programming languages, each with its own syntax and semantics. There is no "one fits all" programming language, each language is better suited for certain tasks, for example JavaScript is better suited for web development, whereas Python is better suited for data analysis.

Currently you can group the programming languages in two main categories: compiled and interpreted languages. Compiled languages are translated into machine code before execution, whereas interpreted languages are translated into machine code during execution.

### Static and Dynamic Typing

Static typing is a programming language feature that restricts the type of a variable to be declared before it is used. This means that you have to specify the type of a variable when you declare it, and you cannot change the type of the variable later. Static typing helps you catch errors before you run your code. Examples of statically typed languages are Java, C++, and TypeScript.

Dynamic typing is a programming language feature that allows you to change the type of a variable at runtime. This means that you do not have to specify the type of a variable when you declare it, and you can change the type of the variable later. Dynamic typing makes it easier to write code, but it can lead to errors that are only caught at runtime. Examples of dynamically typed languages are JavaScript, Python, and Ruby.

As the most of the software development artifacts, there are pros and cons for each approach. Static typing helps you catch errors before you run your code, but it can be more difficult to write code. Dynamic typing makes it easier to write code, but it can lead to errors that are only caught at runtime.

### Programming Paradigms

A programming paradigm is a style of programming, a way of thinking about software construction. There are many different paradigms, each with its own strengths and weaknesses and these depend on the programming language.

The most common paradigms are:

- **Imperative Programming** is a programming paradigm that uses statements that change a program's state. In much the same way that the imperative mood in natural languages expresses commands, an imperative program consists of commands for the computer to perform. Imperative programming focuses on describing how a program operates.

- **Declarative Programming** is a programming paradigm that expresses the logic of a computation without describing its control flow. Declarative programming focuses on what the program should accomplish.

- **Functional Programming** is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data. It is a declarative programming paradigm, which means programming is done with expressions or declarations instead of statements.

- **Object-Oriented Programming** is a programming paradigm based on the concept of "objects", which can contain data, in the form of fields, and code, in the form of procedures. A feature of objects is an object's procedures that can access and often modify the data fields of the object with which they are associated.

### Programming Libraries

A programming library is a collection of pre-written code that can be reused in a program. Libraries simplify the process of writing code, since you can use the code in the library instead of writing it from scratch.

Libraries can be written in the same programming language as the program that uses them, or in a different language. Libraries can be used to perform many different tasks, such as reading and writing files, connecting to a database, or creating a graphical user interface.

### Programming Frameworks

A programming framework is a collection of libraries and tools that make it easier to write code. Frameworks provide a structure for your code, so you don't have to write everything from scratch. Frameworks can be used to build many different types of applications, such as web applications, mobile applications, and desktop applications.

Frameworks can be written in the same programming language as the program that uses them, or in a different language. Frameworks can be used to perform many different tasks, such as creating a web server, handling user input, or connecting to a database.

### Web Development

Web development is the work involved in developing a website for the Internet (World Wide Web) or an intranet (a private network). Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services.

For web development basically you need to understand three main technologies:

- **HTML** (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.
- **CSS** (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML.
- **JavaScript** is a high-level, often just-in-time compiled, and multi-paradigm programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.

These three technologies are the basis for web development. However, there are many other technologies and libraries that can be used to improve the development process and the final result.

The web browser is the most common client for web applications. Web browsers are available on many platforms, including desktops, laptops, tablets, and smartphones. This application is the responsible to load and display the result of the html, css and javascript files.

### Version Control with Git and GitHub

Version control is a system that records changes to a file or set of files over time so that you can recall specific versions later. Version control is a way to keep track of changes to your code, so you can go back to a previous version if you need to.

Git is a distributed version control system that allows you to track changes in your code. It is a tool that helps you keep track of the changes you make to your code, so you can go back to a previous version if you need to. Git used a concept called branching, which allows you to create different versions of your code and merge them back together.

Changes in Git are added using commits. A commit is a snapshot of the code at a specific point in time. Commits are used to track changes to the code, so you can go back to a previous version if you need to. Commits are organized in branches, which are used to work on different versions of the code.

Branches are basically copies of the code that you can work on without affecting the main code. You can create a branch to work on a new feature, fix a bug, or experiment with new ideas. When you are done with the branch, you can merge it back into the main code. You can merge branches between each other, create new branches from existing branches, and delete branches that are no longer needed.

GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere. GitHub is a web-based platform that uses Git, a distributed version control system. GitHub is a great tool to collaborate with other developers, since it allows you to share your code with others and work together on the same project.

With Git and GitHub you manage the code of the project in local and remote repositories. A local repository is a copy of the code that is stored on your computer, whereas a remote repository is a copy of the code that is stored on a server. You can work on the code in the local repository, and then push the changes to the remote repository. You can also pull changes from the remote repository to the local repository to keep the code up to date.

Branching strategy is a way to organize the code in the repository. The branching strategy defines how branches are created, merged, and deleted. There are many different branching strategies, each with its own strengths and weaknesses. The branching strategy is important because it helps you keep the code organized and makes it easier to work with other developers.

A Pull Request is a way to propose changes to the code in the repository. A Pull Request is a request to merge a branch into another branch. When you create a Pull Request, you can review the changes, discuss the changes with other developers, and make sure the changes are ready to be merged. A Pull Request is a great way to collaborate with other developers and improve the quality of the code.

---

## Technologies

### JavaScript

JavaScript is a high-level, often just-in-time compiled, and multi-paradigm programming language that conforms to the ECMAScript specification. JavaScript has features of functional programming, object-oriented programming, and imperative programming.

JavaScript is easy to learn and use, and it is the most popular programming language for web development. JavaScript is used to create interactive web pages and also server-side applications with Node.js. However JavaScript has some drawbacks, like the lack of types and the asynchronous nature of the language.

### TypeScript

TypeScript is a strict syntactical superset of JavaScript that adds optional static typing to the language. TypeScript is designed for the development of large applications and transcompiles to JavaScript. TypeScript is a great tool to improve the development process and the final result of the code.

It is important to mention that TypeScript is not a different language, it is a superset of JavaScript, which means that all JavaScript code is valid TypeScript code. TypeScript adds types to JavaScript, which helps you catch errors before you run your code. At the end the browser only understands JavaScript, so TypeScript code is transpiled to JavaScript before running.

### Node.js

Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser.

JavaScript is a language that is executed in the browser, however, with Node.js you can execute JavaScript code on the server side. This allows you to create web servers, command line tools, and in our case, write the actual code for the project.

### NPM

NPM is a package manager for the JavaScript programming language. It is the default package manager for Node.js. NPM consists of a command-line client and an online database of public and paid-for private packages, called the NPM registry.

When we are programming, we do not want to write everything from scratch, we want to reuse code that has already been written. NPM allows you to install packages that contain code that you can use in your project. NPM is a great tool to improve the development process and the final result of the code.

When you install a package using NPM, the package is downloaded from the NPM registry and installed in the `node_modules` folder in your project. You can then use the code in the package in your project. It is important to mention that the `node_modules` folder is not versioned, so you should not commit it to the repository.

### PNPM

PNPM is another package manager for Node.js. It is similar to NPM, but it has some differences. PNPM uses a different approach to store packages, which makes it faster and more efficient than NPM. PNPM is a great tool to improve the development process and the final result of the code.

### React

React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.

React uses the concept of components, which are reusable pieces of code that can be used to build user interfaces. React components are written in JavaScript and can contain HTML, CSS, and JavaScript code. React components can be used to create complex user interfaces with a minimal amount of code.

### Next.js

Next.js is a React framework that allows you to build server-side rendered (SSR) web applications. Next.js is built on top of React and provides many features to help you build web applications faster and more efficiently.

Next.js provides features like server-side rendering, static site generation, and automatic code splitting. Next.js also provides a file-based routing system, which makes it easy to create routes for your web application.

### Tailwind CSS

Tailwind CSS is a utility-first CSS framework for rapidly building custom designs. Tailwind CSS is different from other CSS frameworks like Bootstrap and Foundation, because it is not opinionated. This means that Tailwind CSS does not provide pre-designed components like buttons and cards, instead it provides utility classes that you can use to style your own components.

---

## Tools

### Command Line Interface (CLI)

A command-line interface (CLI) processes commands to a computer program in the form of lines of text. The program which handles the interface is called a command-line interpreter or command-line processor. Operating systems implement a command-line interface in a shell for interactive access to operating system functions or services.

The CLI depends on the operating system. For example, in Unix-like systems (Mac and Linux), the shell is the most common CLI, whereas the Command Prompt is the default CLI in Windows.

- **Windows** The terminal can be opened using the `Win + R` keys and typing `cmd` or `powershell`.
- **Mac OS** The terminal can be opened using the `Cmd + Space` keys and typing `terminal`.
- **Linux** The terminal can be opened using the `Ctrl + Alt + T` keys.

### Visual Studio Code

Visual Studio Code is an application you can install on your computer whatever the operating system you are using. It allows you to write code in many programming languages and provides many features to help you write code faster and more efficiently.

VS Code is an Integrated Development Environment (IDE) that provides many features like syntax highlighting, code completion, debugging, and many others. Since basically all the code in this project is written in JavaScript, you can use VS Code to write code for this project.

### Git

Git is a distributed version control system that allows you to track changes in your code. It is a tool that helps you keep track of the changes you make to your code, so you can go back to a previous version if you need to.

### GitHub

GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere. GitHub is a web-based platform that uses Git, a distributed version control system.

GitHub is a great tool to collaborate with other developers, since it allows you to share your code with others and work together on the same project. You can use GitHub to store your code, track changes, and manage issues and pull requests.

---

## Useful Websites

### devdocs.io

DevDocs combines multiple API documentations in a fast, organized, and searchable interface. Here you can find documentation for many programming languages and libraries.

> [https://devdocs.io/](https://devdocs.io/)

### CodeSignal

CodeSignal is a platform for assessing and improving programming skills. It provides a library of coding challenges and examples of code in different languages.

> [https://codesignal.com/](https://codesignal.com/)

---

## File extensions

| Extension | Description                                                                           |
| --------- | ------------------------------------------------------------------------------------- |
| .html     | HTML file, contains the structure of a web page.                                      |
| .css      | CSS file, contains the style of a web page like color, spacing and position           |
| .js       | JavaScript file, contains the logic of a web page.                                    |
| .json     | JSON file, contains data in a structured format.                                      |
| .md       | Markdown file, contains text with formatting. It is used ofter for documentation only |
| .ts       | TypeScript file, contains code written in TypeScript.                                 |
| .jsx      | JavaScript file, contains code written in JavaScript with JSX syntax.                 |
| .tsx      | TypeScript file, contains code written in TypeScript with JSX syntax.                 |
