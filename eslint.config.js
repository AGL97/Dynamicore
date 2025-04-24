const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const { rules } = require('eslint-config-prettier');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
    rules:{        
            "printWidth": 100,
            "tabWidth": 2,
            "singleQuote": true,
            "bracketSameLine": true          
    }
  },
]);
