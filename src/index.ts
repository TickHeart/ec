import dayjs from 'dayjs'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { degitReact } from './degitReact'
import { easyCreate } from './easyCreate'
import { makePackage } from './makePackage'
import { antfuEslint } from './antfuEslint'
import { vitestEc } from './vitestEc'
import { degitTs } from './degitTs'
import { degitVue3 } from './degitVue3'

const questions = [
  {
    type: 'list',
    name: 'type',
    message: 'Please select the generated file',
    choices: ['EasyCreate', 'MakePackage', 'AntfuEslint', 'DegitTs', 'DegitReact', 'DegitVue3'],
  },
]

const behavior = {
  EasyCreate: easyCreate,
  MakePackage: makePackage,
  AntfuEslint: antfuEslint,
  DegitTs: degitTs,
  Vitest: vitestEc,
  DegitReact: degitReact,
  DegitVue3: degitVue3,
}

type BehaviorKey = keyof typeof behavior

async function allocatingExecutionFlow() {
  const { type } = await inquirer.prompt(questions)

  const executionBehavior = behavior[type as BehaviorKey]
  await executionBehavior()

  const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

  // eslint-disable-next-line no-console
  console.log(
    `${chalk.blue(
      `Now ${now}. Time flies and the years fly by. Come on Junior !`,
    )}\n`,
  )
}

allocatingExecutionFlow()
