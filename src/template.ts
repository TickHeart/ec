export const TEMPLATE = {
  gitignore: {
    toFileName: ".gitignore",
  },
  "prettierrc.yml": {
    toFileName: ".prettierrc.yml",
  },
  'antfu-eslint': {
    toFileName: '.eslintrc'
  }
};

export type TemplateName = keyof typeof TEMPLATE;
