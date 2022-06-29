import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import inquirer from 'inquirer'
import chalk from 'chalk'
import prettier from 'prettier'

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
  const body = await changeBodyToString(packageJsonBody, inquirerData)

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
async function changeBodyToString(packageJsonBody: any, inquirerData: any) {
  const { author, repositoryUrl } = inquirerData

  const projectName = (repositoryUrl as string).split('/').at(-1)

  packageJsonBody.name = projectName
  packageJsonBody.author = author
  packageJsonBody.license = 'MIT'
  packageJsonBody.homepage = `${repositoryUrl}#readme`
  packageJsonBody.bugs = { url: `${repositoryUrl}/issues` }
  packageJsonBody.repository = { type: 'git', url: `git+${repositoryUrl}` }

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
