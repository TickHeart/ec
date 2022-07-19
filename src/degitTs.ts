import chalk from 'chalk'
import { execaCommand } from 'execa'

// eslint-disable-next-line no-console
const log = console.log

export async function degitTs() {
  const cwd = process.cwd()
  const shellForce = 'degit TickHeart/starter-ts --force'
  try {
    await execaCommand(shellForce, { stdio: 'inherit', encoding: 'utf-8', cwd })
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
