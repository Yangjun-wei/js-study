#!/usr/bin/env node

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

console.log('开始创建项目......');
inquirer
  .prompt([{ type: 'input', name: 'name', message: '项目名:' }])
  .then(answers => {
    const tempDir = path.join(__dirname, 'templates');
    const destDir = process.cwd();
    fs.readdir(tempDir, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        ejs.renderFile(
          path.join(tempDir, file),
          answers,
          (renderErr, renderResult) => {
            if (renderErr) throw renderErr;
            fs.writeFileSync(path.join(destDir, file), renderResult);
          },
        );
      });
    });
  });
