export const TEMPLATE = {
  'gitignore': {
    toFileName: '.gitignore',
  },
  'prettierrc.yml': {
    toFileName: '.prettierrc.yml',
  },
  'antfu-eslint': {
    toFileName: '.eslintrc',
  },
  'vitest': {
    toFileName: 'vitest.config.ts',
  },
}

export type TemplateName = keyof typeof TEMPLATE
