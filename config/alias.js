const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

module.exports = {
  'app-images': resolveApp('public/images'),
  'app-components': resolveApp('src/components'),
  'app-constants': resolveApp('src/constants'),
  'app-services': resolveApp('src/services'),
  'app-utils': resolveApp('src/utils'),
  'app-pages': resolveApp('src/pages'),
}