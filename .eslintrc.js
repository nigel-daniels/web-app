/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true,
		'jquery':	true
    },
    'extends': 'eslint:recommended',
	'parser': 'babel-eslint',
    'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module',
		'allowImportExportEverywhere': true,
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'plugins': [
        'react',
		'react-redux'
    ],
    'extends': [
        'plugin:react-redux/recommended'
    ],
    'rules': {
		'no-console': 0,
        'indent': [
            'error',
            'tab'
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error'
    }
};
