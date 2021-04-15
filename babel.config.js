module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  sourceType: 'unambiguous',
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
