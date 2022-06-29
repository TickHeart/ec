import { fileURLToPath } from 'url'
import path from 'path'
import { readFile, writeFile } from 'fs/promises'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { execaCommand } from 'execa'
import { TEMPLATE } from './template'
import type { TemplateName } from './template'

// eslint-disable-next-line no-console
const log = console.log

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const questions: inquirer.QuestionCollection = [
  {
    type: 'list',
    name: 'type',
    message: 'Package management tools',
    choices: ['pnpm', 'yarn', 'npm'],
    default: 'pnpm',
  },
]

export async function antfuEslint() {
  const cwd = process.cwd()

  const { type } = await inquirer.prompt(questions)
  const shell = `${type} add -D eslint @antfu/eslint-config typescript`
  try {
    await execaCommand(shell, { stdio: 'inherit', encoding: 'utf-8', cwd })
  }
  catch {
    log('发现错误了，请手动安装')
  }

  const templateUrl = path.resolve(__dirname, '..', 'templates', 'antfu-eslint')
  const tpFileUrl = path.resolve(cwd, TEMPLATE['antfu-eslint' as TemplateName].toFileName)

  const templateBody = await readFile(templateUrl, 'utf-8')
  await writeFile(tpFileUrl, templateBody)

  log(
    `${chalk.bgGreen(
      'eslint configuration generation complete!',
    )}\n`,
  )
}
