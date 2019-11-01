module.exports = {
  'presets': [
    [
      '@babel/preset-env',
      {
        'targets': {
          'node': '12'
        }
      }
    ],
    '@babel/typescript'
  ],
  'plugins': [
    '@babel/proposal-class-properties',
    'import-graphql'
  ]
}
