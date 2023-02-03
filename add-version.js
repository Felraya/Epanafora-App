const fs = require('fs');
const semver = require('semver');

fs.readFile('package.json', 'utf-8', (err, data) => {
  if (err) throw err;
  
  const packageJson = JSON.parse(data);
  const newVersion = semver.inc(packageJson.version, 'patch');
  
  packageJson.version = newVersion;
  
  fs.writeFile('package.json', JSON.stringify(packageJson, null, 2), (err) => {
    if (err) throw err;
    console.log(`Package version incremented to ${newVersion}\n`);
  });
});