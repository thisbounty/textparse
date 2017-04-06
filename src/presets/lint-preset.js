const lint = require('neutrino-lint-base');
const merge = require('deepmerge');

module.exports = neutrino => {
  // Implement custom linting
  lint(neutrino);
  neutrino.config.module
    .rule('lint')
    .loader('eslint', props => merge(props, {
      options: {
        globals: ['describe', 'expect', 'jest', 'test', 'document', 'window', 'fetch'],
        rules: {
          // Don't require () for single argument arrow functions
          'arrow-parens': 'off',
          // Don't require trailing commas
          'comma-dangle': 'off',
          // Don't require file extensions on imports
          'import/extensions': 'off',
          // Don't mark as unresolved without extensions
          'import/no-unresolved': 'off',
          // Don't let ESLint tell us how to use whitespace for imports
          'padded-blocks': 'off',
          // Hold off on propTypes for now
          'react/prop-types': 'off',
		  // Change linebreak style depending which OS is being used
		  "linebreak-style": ["error", process.env.OS === 'windows' ? "windows" : "unix"]
        }
      }
    }))
};
