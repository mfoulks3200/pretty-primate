const fs = require('fs');
const path = require('path');
const themesPackage = require('monaco-themes/package.json');

const directoryPath = './node_modules/monaco-themes/themes'; // Replace with the path to your directory

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
    }
    let themeFile = `// Generated automatically by scripts/generateThemesFile.js\n`;
    themeFile += `// Generated at ${Date.now()} from monaco-themes ${themesPackage.version}\n\n`;

    let themes = [];
    for (const file of files) {
        if (file.endsWith('.json') && file !== 'themelist.json') {
            const themeName = file.replace('.json', '');
            const themePath = path.join(directoryPath, file);
            const themeObject = JSON.parse(fs.readFileSync(themePath, 'utf8'));
            themes.push({
                name: themeName,
                id: themeName.toLowerCase().replaceAll(/[^a-z0-9]/gm, "-"),
                data: themeObject
            });
        }
    }
    themeFile += `export const MonacoThemes = ${JSON.stringify(themes, null, 2)};`;
    fs.writeFileSync('./src/pages/common/MonacoThemes.ts', themeFile);
});