export const formatBlogContent = (content: string): string => {
  return content
    .replace(/\*\*/g, '') // Removes all occurrences of **
    .replace(/\\n/g, '<br />') // Replaces \n with <br />
    .replace(/#/g, ''); // Removes all occurrences of #
};
