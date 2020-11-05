const fs = require('fs');
const path = require('path');
var pjson = require(`../package.json`);

function fetchVersion() {
  return pjson.version;
}

function replaceAndroidVersion(version) {
  const buildGradleFilePath = path.join('android', 'app', 'build.gradle');

  const versionCode = ;
}

function replaceIosVersion(version) {
  const infoPlistFilePath = path.join('ios', 'App', 'App', 'Info.plist');

  const cfBundleVersion = ;
  replaceInFile(infoPlistFilePath, );
}

function replaceInFile(file, oldValue, newValue) {
  const encoding = 'utf8';
  var content = fs.readFileSync(file, encoding);
  var matchArr = content.match(oldValue);
  if (!matchArr) {
      return;
  }
  for (const match of matchArr) {
      content = content.replace(match, newValue);
  }
  fs.writeFileSync(file, content, encoding);
}

try {
  const version = fetchVersion();
  replaceAndroidVersion(version);
  replaceIosVersion(version);
} catch (err) {
  console.error(err);
  process.exit(1);
}
