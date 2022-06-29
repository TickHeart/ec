import path from 'path'
import { fileURLToPath } from 'url'
import { readFile, writeFile } from 'fs/promises'
import inquirer from 'inquirer'
import chalk from 'chalk'
import type { TemplateName } from './template'
import { TEMPLATE } from './template'

// eslint-disable-next-line no-console
const log = console.log

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const templateNames = ['gitignore', 'prettierrc.yml', 'all']

const questions = [
  {
    type: 'list',
    name: 'filename',
    message: 'Please select the generated file',
    choices: templateNames,
  },
]
export async function easyCreate() {
  const { filename } = await inquirer.prompt(questions)
  if (filename !== 'all') {
    await writeFilesThroughTemplates(filename)
  }
  else {
    for (const file of templateNames) {
      if (file === 'all')
        continue
      await writeFilesThroughTemplates(file)
    }
  }
  log(
    `${chalk.green(
      'Thank you very much for using this easy create. i am really happy. Good luck with your work!',
    )}\n`,
  )
}

async function writeFilesThroughTemplates(filename: string): Promise<void> {
  const cwd = process.cwd()
  const templateUrl = path.resolve(__dirname, '..', 'templates/', filename)
  const fileBody = await readFile(templateUrl, { encoding: 'utf8' })

  const { toFileName } = TEMPLATE[filename as TemplateName]
  const toFileUrl = path.resolve(cwd, toFileName)

  await writeFile(toFileUrl, fileBody, { flag: 'w' })

  log(chalk.bgGreen(`.${filename} created successfully` + '\n'))
}
