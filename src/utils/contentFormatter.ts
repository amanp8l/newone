export const formatBlogContent = (content: string): string => {
  return content
    // Headers
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-black mb-6">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold text-black mb-4">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-black mb-3">$1</h3>')
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-black">$1</strong>')
    // Paragraphs and line breaks
    .replace(/\\n\\n/g, '</p><p class="mb-4 text-black">')
    .replace(/\\n/g, '<br />')
    // Wrap in paragraph if not already wrapped
    .replace(/^([^<].*)/gm, '<p class="mb-4 text-black">$1</p>');
};