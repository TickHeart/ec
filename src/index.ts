import inquirer from 'inquirer'
import { easyCreate } from './easyCreate'
import { makePackage } from './makePackage'

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
    easyCreate()
  } else {
    makePackage()
  }
}

allocatingExecutionFlow()
