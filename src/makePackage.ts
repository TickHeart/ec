import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import inquirer from 'inquirer'
import chalk from 'chalk'
import prettier from 'prettier'

type Keys<T> = keyof T

const questions = [
  {
    type: 'input',
    name: 'author',
    message: '🐯What is the name of the author：',
  },
  {
    type: 'input',
    name: 'repositoryUrl',
    message: '🏠What is the address of your repository：',
  },
]

export async function makePackage() {
  const inquirerData = await inquirer.prompt(questions)

  const [packageJsonBody, packageJsonUrl] = await readPackageJson()
  const body = await injectBodyToString(packageJsonBody, inquirerData)

  await writeFile(packageJsonUrl, body)
  // eslint-disable-next-line no-console
  console.log(`${chalk.bgGreen('Write success')}\n`)
}

async function readPackageJson() {
  const cwd = process.cwd()
  const packageJsonUrl = path.resolve(cwd, 'package.json')
  const res = await readFile(packageJsonUrl, {
    encoding: 'utf8',
  })
  return [JSON.parse(res), packageJsonUrl]
}
async function injectBodyToString(packageJsonBody: any, inquirerData: any) {
  const { author, repositoryUrl } = inquirerData
  const projectList = (repositoryUrl as string).split('/')
  const projectName = projectList[projectList.length - 1]

  const info = {
    name: projectName,
    author,
    license: 'MIT',
    homepage: `${repositoryUrl}#readme`,
    bugs: { url: `${repositoryUrl}/issues` },
    repository: { type: 'git', url: `git+${repositoryUrl}` },
  }

  for (const key in info) {
    const val = info[key as Keys<typeof info>]
    packageJsonBody[key] = val
  }

  const res = prettier.format(JSON.stringify(packageJsonBody), {
    parser: 'json',
  })

  // eslint-disable-next-line no-console
  console.log(
    `${chalk.green('The configuration has been modified and is being written...')
      }\n`,
  )
  return res
}
