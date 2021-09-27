const { execSync } = require("child_process");
const inquirer = require('inquirer')

const remoteName = process.argv[2] || "origin";

const cleanUpLists = (s = "") =>
  s
    .split("\n")
    .map((a) => a.trim())
    .map((a) => a.replace(`${remoteName}/`, ""))
    .filter((a) => !a.includes("->"));

module.exports = async () => {
  const localBranches = cleanUpLists(
    execSync("git branch").toString().trim().replace("* ", "")
  );

  const options = await inquirer.prompt([
    {
        type: 'checkbox',
        name: 'branches',
        choices: localBranches.filter(b => b !== 'master')
    }
  ])

  execSync(`git branch -D ${options.branches.join(' ')}`)

  console.log('successful !!')
};
