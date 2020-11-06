const fs = require('fs');
const path = require('path');
const pjson = require('../package.json');

function fetchVersion() {
  return pjson.version;
}

function updateAndroidVersion(version) {
  const buildGradleFilePath = path.join('android', 'app', 'build.gradle');
  let buildGradleFileContent = readFileContent(buildGradleFilePath);

  const versionCodeRegex = /versionCode \d+/;
  const oldVersionCode = buildGradleFileContent.match(versionCodeRegex)[0].replace('versionCode ', '');
  const newVersionCode = parseInt(oldVersionCode) + 1;
  buildGradleFileContent = buildGradleFileContent.replace(versionCodeRegex, `versionCode ${newVersionCode}`);

  const versionNameRegex = /versionName "\d+.\d+.\d+"/;
  buildGradleFileContent = buildGradleFileContent.replace(versionNameRegex, `versionName "${version}"`);

  writeFileContent(buildGradleFilePath, buildGradleFileContent);
}

function updateIosVersion(version) {
  const infoPlistFilePath = path.join('ios', 'App', 'App', 'Info.plist');
  let infoPlistFileContent = readFileContent(infoPlistFilePath);

  const cfBundleVersionRegex = /<key>CFBundleVersion<\/key>[\r\n]\s+<string>\d+<\/string>/;
  const oldCFBundleVersion = infoPlistFileContent
    .match(cfBundleVersionRegex)[0]
    .replace(/<key>CFBundleVersion<\/key>[\r\n]\s+<string>/, '')
    .replace(/<\/string>/, '');
  const newCFBundleVersion = parseInt(oldCFBundleVersion) + 1;
  infoPlistFileContent = infoPlistFileContent.replace(
    cfBundleVersionRegex,
    `<key>CFBundleVersion</key>\r\n  <string>${newCFBundleVersion}</string>`,
  );

  const cdBundleShortVersionStringRegex = /<key>CFBundleShortVersionString<\/key>[\r\n]\s+<string>\d+.\d+.\d+<\/string>/;
  infoPlistFileContent = infoPlistFileContent.replace(
    cdBundleShortVersionStringRegex,
    `<key>CFBundleShortVersionString</key>\r\n  <string>${version}</string>`,
  );

  writeFileContent(infoPlistFilePath, infoPlistFileContent);
}

function readFileContent(filePath, encoding = 'utf8') {
  return fs.readFileSync(filePath, encoding);
}

function writeFileContent(filePath, content, encoding = 'utf8') {
  fs.writeFileSync(filePath, content, encoding);
}

try {
  const version = fetchVersion();
  updateAndroidVersion(version);
  updateIosVersion(version);
} catch (err) {
  console.error(err);
  process.exit(1);
}
