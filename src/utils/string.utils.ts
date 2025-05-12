export const getFirstLineFromMarkdown = (markdown: string) => {
  const plainText = markdown
    .replace(/[#_*~`>]/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1");
  return plainText.split("\n")[0];
};
