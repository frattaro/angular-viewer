const istanbul = require('istanbul-lib-coverage')
const path = require('path')

module.exports = (on, config) => {
  const coverage = istanbul.createCoverageMap()
  const absolutePath = path.resolve(__dirname, '../../../')

  on('task', {
    // Generate code coverage reporting that survives between test suites.
    // Currently, the `sourceroot` property returns a relative path which breaks
    // the reporting capabilities. We replace any relative paths with absolutes.
    coverage (file) {
      coverage.merge(file)
      return JSON.stringify(coverage)
        .replace(/"(sourceroot)":"(?!\/)/ig, `"$1":"${absolutePath}/`)
    }
  })
}
