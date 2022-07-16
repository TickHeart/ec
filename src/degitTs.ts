import chalk from 'chalk'
import { execaCommand } from 'execa'

// eslint-disable-next-line no-console
const log = console.log

export async function degitTs() {
  const cwd = process.cwd()
  const shell = 'degit TickHeart/starter-ts'
  try {
    await execaCommand(shell, { stdio: 'inherit', encoding: 'utf-8', cwd })
  }
  catch {
    log(
      `${chalk.red(
        '安装是失败，请检测degit环境!',
      )}\n`,
    )
  }

  log(
    `${chalk.bgGreen(
      'degit success!',
    )}\n`,
  )
}
