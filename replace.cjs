const fs = require('fs');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [search, replace] of replacements) {
    content = content.replace(new RegExp(search, 'g'), replace);
  }
  fs.writeFileSync(filePath, content);
}

replaceInFile('src/components/ConsumerApp.tsx', [['emerald', 'lime']]);
replaceInFile('src/components/CompanyApp.tsx', [
  ['sky-', 'lime-'],
  ['#0EA5E9', '#84cc16'],
  ['#F0F9FF', '#f7fee7'],
  ['#0284c7', '#65a30d']
]);
console.log('Replaced successfully');
