import dayjs from 'dayjs'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { easyCreate } from './easyCreate'
import { makePackage } from './makePackage'
import { antfuEslint } from './antfuEslint'

const questions = [
  {
    type: 'list',
    name: 'type',
    message: 'Please select the generated file',
    choices: ['EasyCreate', 'MakePackage', 'AntfuEslint'],
  },
]

async function allocatingExecutionFlow() {
  const { type } = await inquirer.prompt(questions)
  if (type === 'EasyCreate')
    await easyCreate()

  else if (type === 'MakePackage')
    await makePackage()

  else if (type === 'AntfuEslint')
    await antfuEslint()

  const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

  // eslint-disable-next-line no-console
  console.log(
    `${chalk.blue(
      `Now ${now}. Time flies and the years fly by. Come on Junior !`,
    )}\n`,
  )
}

allocatingExecutionFlow()
