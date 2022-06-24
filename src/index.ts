import dayjs from 'dayjs'
import inquirer from 'inquirer'
import { easyCreate } from './easyCreate'
import { makePackage } from './makePackage'
import chalk from 'chalk'

const questions = [
  {
    type: 'list',
    name: 'type',
    message: 'Please select the generated file',
    choices: ['EasyCreate', 'MakePackage']
  }
]

async function allocatingExecutionFlow() {
  const { type } = await inquirer.prompt(questions)
  if (type === 'EasyCreate') {
    await easyCreate()
  } else {
    await makePackage()
  }
  var now = dayjs().format('YYYY-MM-DD HH:mm:ss')
  console.log(
    chalk.blue(
      `Now ${now}. Time flies and the years fly by. Come on Junior !`
    ) + '\n'
  )
}

allocatingExecutionFlow()
