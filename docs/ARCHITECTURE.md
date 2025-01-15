# Architecture

In software engineering, software architecture refers to the high level structures of a software system, the discipline of creating such structures, and the documentation of these structures. These structures are needed to reason about the software system. Each structure comprises software elements, relations among them, and properties of both elements and relations. The architecture of a software system is a metaphor, analogous to the architecture of a building. It functions as a blueprint for the system and the project, laying out the tasks necessary to be executed by the design teams.

There are many different types of architectural patterns, each with its own set of principles and rules. In order to explain the architecture of this specific project, this document first describes the patterns used in the project, and then explains how they are implemented.

---

## Table of Contents

---

## Patterns

### Hexagonal Architecture

The hexagonal architecture, or ports and adapters architecture, is an architectural pattern used in software design. It aims at creating loosely coupled application components that can be easily connected to their software environment by means of ports and adapters. This makes components exchangeable at any level and facilitates test automation.

The hexagonal architecture separates the application core from the external environment. The core is the part of the application that contains the business logic. The external environment is everything outside the application that interacts with the core. This includes the user interface, databases, messaging systems, and other services.

### Atomic Design

Atomic design is a methodology for creating design systems. It was developed by Brad Frost in 2013. The methodology breaks down the design process into five distinct stages: atoms, molecules, organisms, templates, and pages. Each stage represents a different level of abstraction and complexity.

- Atoms are the basic building blocks of a design system. They are the smallest units of design, such as buttons, inputs, and labels.
- Molecules are groups of atoms that work together to form a single functional unit, such as a form or a card.
- Organisms are groups of molecules that work together to form a more complex component, such as a header or a footer.
- Templates are groups of organisms that work together to form a page layout. Pages are specific instances of templates that represent actual content.

To check the full documentation, please visit the official [Atomic Design website](https://bradfrost.com/blog/post/atomic-web-design/).

### Composition Root

The composition root is a design pattern used in software development to configure and assemble the various components of an application. It is responsible for creating instances of classes, setting their dependencies, and wiring them together. The composition root is typically the entry point of an application and is responsible for bootstrapping the application.

---

## Implementation

### Directory Structure

This is the main directory structure of the project:

```bash
.
└── bishal-swing-app/
    ├── .github
    ├── .husky
    ├── .next
    ├── .vscode
    ├── app/
    │   ├── api
    │   ├── auth
    │   └── home
    ├── coverage
    ├── docs
    ├── node_modules
    ├── public
    └── src/
        ├── business/
        │   ├── entities
        │   ├── repositories
        │   └── use-cases
        ├── context
        ├── implementation
        └── utils
```

Not all the files are shown in this structure, only the most important ones. Below is also a brief explication of each folder:

- `.github`: Contains the GitHub Actions workflows. This is for the deployment configuration.
- `.husky`: Contains the Husky configuration. This is for the Git hooks and the update will be barely necessary.
- `.next`: Contains the Next.js build files. This is for the Next.js framework and it is not updated manually.
- `.vscode`: Contains the Visual Studio Code configuration. This is for the Visual Studio Code IDE configuration.
- `app`: Contains the pages of the application. This is for the Next.js framework and it contains the implementation of the pages.
- `coverage`: Contains the coverage reports. This is for the Jest testing framework and it is updated automatically.
- `docs`: Contains the documentation files. This is for the project documentation.
- `node_modules`: Contains the Node.js modules. This is for the Node.js framework and it is updated automatically.
- `public`: Contains the public files. This is for the public files of the application.
- `src`: Contains the source code of the application. Here is the main place of the development work.
  - `business`: Contains the business logic of the application.
    - `entities`: Contains the entities of the application.
    - `repositories`: Contains the repositories of the application.
    - `use-cases`: Contains the use cases of the application.
  - `context`: Contains the context artifacts of the application.
  - `implementation`: Contains the implementation of the application.
  - `utils`: Contains the utilities of the application.

### Hexagonal Architecture Implementation

The main directive is the separation of concerns and the dependency inversion principle. The business logic is separated from the external environment. The business logic is contained in the `business` folder, and the external environment is contained in the `implementation` folder. The `business` folder contains the entities, repositories, and use cases of the application. The `implementation` folder contains the user interface, data access, and other external dependencies.

The business logic doesn't depend of final details of the implementation. The business logic is the core of the application and should be independent of the external environment. This allows the business logic to be easily tested and reused in different contexts.

The external environment depends on the business logic. The external environment is responsible for connecting the business logic to the outside world. This includes the user interface, data access, and other external dependencies. The external environment is responsible for configuring and assembling the various components of the application.

Here is where Effect.js comes into play. The Effect.js is a library that allows to implement the hexagonal architecture in JavaScript. It provides a set of tools and conventions for creating loosely coupled application components that can be easily connected to their software environment. The Effect.js library is used to implement the business logic in simple functions and using the called Context Services to interact with the external environment.

An example of a use case implemented with Effect.js is the following:

```typescript
export const signUpNoVerifiedAccountUC = Effect.gen(function* () {
  const input = yield* SignUpNoVerifiedAccountInputTag;
  const findUser = yield* FindUserByAccountTag;
  const createUser = yield* CreateUserTag;
  const createAuthEvent = yield* CreateAuthenticationEventTag;
  const notifyAuthEvent = yield* NotifyAuthenticationEventTag;
  const businessUtils = yield* CommonBusinessUtilsTag;

  const duplicates = [
    yield* findUser({
      userName: input.userName,
    }),
    yield* findUser({
      identifier: input.phone,
    }),
  ];
  if (duplicates.some(Boolean))
    yield* Effect.fail(new DuplicatedAccountError());

  const encryptedPassword = yield* businessUtils.hash(input.password, 'hard');
  const user = yield* createUser({
    name: input.userName,
    firstName: input.firstName,
    lastName: input.lastName,
    accounts: [
      {
        verified: false,
        type: 'phone',
        identifier: input.phone,
        details: {
          password: encryptedPassword,
        },
      },
    ],
  });

  const token = `${yield* businessUtils.hash(user.name, 'soft')}-${yield* businessUtils.getUuid()}`;
  const requestVerificationEvent = yield* createAuthEvent({
    userId: user.id,
    createdAt: yield* businessUtils.getCurrentTime(),
    type: 'accountVerificationRequest',
    data: {
      accountType: 'phone',
      accountIdentifier: input.phone,
      token,
    },
  });

  yield* notifyAuthEvent(requestVerificationEvent);

  return;
});
```

> **Note**: Javascript generators are used to implement the Effect.js library. Some technical background is required to understand the code.
>
> Check [javascript generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) for more information.

As you can see, in the previous example the implementation detail is hidden. The use case is implemented as a simple function that calls the Context Services to interact with the external environment. The implementation is attached using a Effect Context Service, or using the name convention for this repository: An adapter;

Here is an example of an adapter:

```typescript
export const findUserInMongo = (params: Partial<User>) =>
  Effect.gen(function* () {
    const implementationConfig = yield* ImplementationConfigTag;
    const database = implementationConfig['database'];

    if (!database)
      yield* Effect.fail(new MissingImplementationConfigError('database'));

    const db = getServerContext().mongoConnection.getClient().db(database);

    const userDocument = yield* Effect.tryPromise({
      try: () =>
        db.collection(BISHAL_USERS).findOne(entityToSimpleFilters(params)),
      catch: e => new ReadError(e),
    });

    return userDocument ? userFromDocument(userDocument) : undefined;
  });
```

The previous example as you notice, has a dependency on the MongoDB database. This is the implementation detail that is hidden from the business logic. The business logic doesn't depend on the MongoDB database, it depends on the `findUser` Context Service. The `findUser` Context Service is responsible for connecting the business logic to the MongoDB database.

For more examples of how Effect.js separates the business logic from the implementation details, please check official [Effect.js Services documentation](https://effect.website/docs/requirements-management/services/).

### User Interface

The user interface is considered an implementation detail. This means that the user interface is not part of the core application logic. Instead, it is a separate layer that implements the other layers of the application. This separation allows the user interface to be easily replaced or modified without affecting the core application logic.

The most of the visual elements are located in the folder:

```bash
src/implementation/components
```

This contains the most of the elements except the pages, which based on the Next.js framework an the app router feature, are located in the folder:

```bash
app
```

Basically this Page imports all of the necessary components and renders them in the desired order. In this place, using the Next.js app router feature we can implement server actions and layouts as required. A variant of a Composition Root patten is applied for each page.
