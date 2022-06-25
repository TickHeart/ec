import { fileURLToPath } from "url"
import path from 'path'
import {execSync} from 'child_process'
import inquirer from 'inquirer'
import { TEMPLATE, TemplateName } from "./template"
import {readFile, writeFile} from 'fs/promises'
import chalk from "chalk"
import shell from "shelljs"

const log = console.log

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const questions: inquirer.QuestionCollection = [
  {
    type: 'list',
    name: 'type',
    message: 'Package management tools',
    choices: ['pnpm', 'yarn', 'npm'],
    default: 'pnpm'
  }
]

export async function antfuEslint() {
  const cwd = process.cwd();

  // const { type } = await inquirer.prompt(questions)
  // shell.cd(cwd)
  // const isSucc = shell.exec(`${type} add -D eslint @antfu/eslint-config`).code === 0
  // if (!isSucc) {
  //   log(
  //     chalk.bgRed(
  //       'error'
  //     ) + '\n'
  //   )
  // }


  const templateUrl = path.resolve(__dirname, '..', 'templates', 'antfu-eslint')
  const tpFileUrl = path.resolve(cwd, TEMPLATE['antfu-eslint' as TemplateName].toFileName)

  const templateBody = await readFile(templateUrl, 'utf-8')
  await writeFile(tpFileUrl, templateBody)

  log(
    chalk.bgGreen(
      'eslint configuration generation complete!'
    ) + '\n'
  )
}