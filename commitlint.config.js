const scope = ['auth', 'home', 'docs', 'cicd', 'deps'];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', scope],
  },
  scope,
};
