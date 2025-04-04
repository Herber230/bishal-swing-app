const scope = ['docs', 'cicd', 'deps', 'core', 'auth', 'home'];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', scope],
  },
  scope,
};
