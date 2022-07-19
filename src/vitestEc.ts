import path, { resolve } from 'path'
import { readFile, writeFile } from 'fs/promises'
import { log } from 'console'
import { fileURLToPath } from 'url'
import { execaCommand } from 'execa'
import inquirer from 'inquirer'
import { isArray } from 'ztshared'
import chalk from 'chalk'
import stripJsonComments from 'strip-json-comments'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const questions = [
  {
    type: 'list',
    name: 'type',
    message: '请选择模式',
    choices: ['ts', 'js'],
  },
  {
    type: 'list',
    name: 'cmd',
    message: '请选择包管理器',
    choices: ['pnpm', 'yarn', 'npm'],
  },
]

export async function vitestEc() {
  const { type, cmd } = await inquirer.prompt(questions)
  await useListExecaCommand(['add vitest ' + `--${cmd}` as string, 'add unplugin-auto-import ' + `--${cmd}` as string])

  if (type === 'js') { await writeFilesThroughTemplates('vitest', 'vitest.config.js') }

  else if (type === 'ts') {
    const cwd = process.cwd()
    const tsconfigPath = resolve(cwd, 'tsconfig.json')
    const tsconfig = JSON.parse(stripJsonComments(await readFile(tsconfigPath, { encoding: 'utf8' })))
    if (!tsconfig.types)
      tsconfig.types = [];

    (tsconfig.types as string[]).push('vitest/globals', 'vitest/importMeta')
    await writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2))
    await writeFilesThroughTemplates('vitest', 'vitest.config.ts')
  }
}

async function useListExecaCommand(commds: string[] | string) {
  const cmd = isArray(commds) ? commds : [commds]
  for (const commd of cmd as string[]) {
    await execaCommand(commd, {
      stdio: 'inherit',
      encoding: 'utf-8',
    })
  }
}

async function writeFilesThroughTemplates(filename: string, fi: string): Promise<void> {
  const cwd = process.cwd()
  const templateUrl = path.resolve(__dirname, '..', 'templates/', filename)
  const fileBody = await readFile(templateUrl, { encoding: 'utf8' })

  const toFileUrl = path.resolve(cwd, fi)

  await writeFile(toFileUrl, fileBody, { flag: 'w' })

  log(chalk.bgGreen(`.${filename} created successfully` + '\n'))
}
