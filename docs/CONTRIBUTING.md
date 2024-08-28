# Contributing

There is an standard way to contribute to this project. There are some basic concepts that you need to know before contributing to this project. Please read the following guidelines before contributing to this project.

---

## Trunk Based Development

This project follows the trunk based strategy. The trunk based strategy is a source-control branching model, where developers collaborate on code in a single branch called `main`, resist any long-lived branches, and use feature flags instead of feature branches. This strategy is used to ensure that the codebase is always in a deployable state.

You can read more about trunk based development

> [Trunk Based Development Site](https://trunkbaseddevelopment.com/).

---

## Collaborating

To collaborate on this project, in general, you need to follow these steps:

1. Clone the repository to your local machine.
2. Create a new branch from the `main` branch.
3. Make changes to the new branch and commit them.
4. Push the changes to your branch.
5. Create a pull request to the `main` branch.
6. Wait for the code review and approval and merge the changes.

To know how to specifically perform these steps, please read the following sections.

---

## Task Details

### Clone the Repository

Clone the repository to your local machine basically involves downloading the files from the repository to your local machine. You can do this by running the following command:

```bash
git clone git@domain.com:username/repository.git
```

It is important to mention that the preferred way to clone the repository is using the SSH protocol. You can read more about how to set up the SSH keys in the following link:

> [Setting up SSH keys](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh).

### Create a New Branch

Creating a new branch is important to separate the changes that you are going to make from the main branch.

A branch is basically a copy of the codebase at a certain point in time. It groups commits that are related to a specific task or feature. All the changes that you perform in a branch are isolated from the main branch until you merge them.

You can create a new branch by running the following command:

```bash
git checkout -b feature/branch-name
```

In the above command, `feature/branch-name` is the name of the branch that you are going to create. It is important to mention that the branch name should be descriptive and should represent the task that you are going to perform. There are some conventions that you can follow to name the branches:

- `feature/branch-name`: Use this convention to create a branch for a new feature.
- `bugfix/branch-name`: Use this convention to create a branch for a bug fix.
- `hotfix/branch-name`: Use this convention to create a branch for a hot fix.

This convention is not technically enforced, but it is a good practice to follow it.

### Make Changes and Commit

After creating a new branch, you can start making changes to the codebase. You can add new files, modify existing files, or delete files. After making the changes, you need to commit them to the branch.

You can commit the changes by running the following command:

```bash
git add .
git commit -m "feat: some new feature description"
```

In the above command, `feat: some new feature description` is the commit message. It is important to mention that the commit message should be descriptive and should represent the changes that you made in the commit. There are some conventions that you can follow to write the commit messages.

Different from the branch names, the commit messages are technically enforced using commitlint. You can read more about the commitlint conventions in the following link:

> [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

### Git Hooks

This project uses git hooks to enforce some rules before committing the changes. The git hooks are scripts that run automatically before or after some git commands. In this project, there are some git hooks that run before committing the changes.

Existent git hooks:

- `pre-commit`: This hook runs before committing the changes. It runs the linters and validates the format of the codebase. Make sure to fix all the errors before committing the changes.
- `commit-msg`: This hook runs before committing the changes. It validates the commit message format. Make sure to follow the commitlint conventions before committing the changes.

The git hooks are located in the `.husky` directory. You can read more about the git hooks in the following link:

> [Husky](https://typicode.github.io/husky/#/).

### Push the Changes

The Push process is basically sending the changes that you made in the branch to the remote repository.

When you push changes, a copy of the branch is created in the remote repository. This copy is called a remote branch. The remote branch is a reference to the branch that you created in your local machine. The remote branch is used to share the changes with other collaborators.

You can push the changes by running the following command:

```bash
git push origin feature/branch-name
```

In the above command, `feature/branch-name` is the name of the branch that you created. It is important to mention that the branch name should be the same as the branch that you created in your local machine.

### Create a Pull Request

Creating a pull request is important to merge the changes that you made in the branch to the main branch. A pull request is a request to merge the changes that you made in the branch to the main branch and it is used to review the changes before merging them.

You create a pull request in GitHub and the collaborators review the changes that you made in the branch. The collaborators can comment on the changes, suggest modifications, or approve the changes. After the code review and approval, the changes are merged to the main branch.

You can create a pull request by following these steps:

1. Go to the repository in GitHub.
2. Click on the `Pull requests` tab.
3. Click on the `New pull request` button.
4. Select the branch that you created in the `compare` dropdown.
5. Select the main branch in the `base` dropdown.
6. Click on the `Create pull request` button.
7. Write a description of the changes that you made in the branch.
8. Click on the `Create pull request` button.

### Code Review and Approval

After creating the pull request, the collaborators review the changes that you made in the branch. The collaborators can comment on the changes, suggest modifications, or approve the changes. The code review is an important step to ensure that the changes are correct and follow the project guidelines.

Also during the PR this project uses GitHub Actions to run the tests and check the code quality. Make sure that all the tests are passing and the code quality is good before merging the changes.

### Merge the Changes

After the code review and approval, you can merge the changes to the main branch. Merging the changes is basically combining the changes that you made in the branch with the main branch. This process can be done in multiple ways and strategies. The preferred way to merge the changes is using the `Squash and merge` strategy.

To know about the `Squash and merge` strategy, please read the following link:

> [Squash and merge](https://docs.github.com/en/github/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request).

### Pull Changes

In some cases, you need to pull the changes that other collaborators made in the main branch to your local machine. You can do this by running the following command:

```bash
git checkout main
git pull origin main
```

In the above commands you first switch to the main branch and then pull the changes from the main branch. It is important to mention that you should always pull the changes from the main branch before creating a new branch.
