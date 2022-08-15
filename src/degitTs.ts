import chalk from 'chalk'
import { execaCommand } from 'execa'
import inquirer from 'inquirer'
import ora from 'ora'
// eslint-disable-next-line no-console
const log = console.log

export async function degitTs() {
  const cwd = process.cwd()
  const fileName = cwd.split('/').pop()
  const shellForce = 'degit TickHeart/starter-ts  --force'
  const shell = 'degit TickHeart/starter-ts demo'
  try {
    const { type } = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        choices: ['是', '否'],
        message: `是否要强制创建？这样会覆盖 ${chalk.red(
          fileName
        )} 文件夹下原有的文件`
      }
    ])
    const spinner = ora('开始加载')
    spinner.start()
    await execaCommand(type === '是' ? shellForce : shell, {
      stdio: 'inherit',
      encoding: 'utf-8',
      cwd
    })
    spinner.succeed('加载成功')
  } catch {
    log(`${chalk.red('安装是失败，请检测degit环境!')}\n`)
  }

  log(`${chalk.bgGreen('degit success!')}\n`)
}
