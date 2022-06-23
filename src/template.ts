export const TEMPLATE = {
  gitignore: {
    toFileName: ".gitignore",
  },
  "prettierrc.yml": {
    toFileName: ".prettierrc.yml",
  },
};

export type TemplateName = keyof typeof TEMPLATE;
