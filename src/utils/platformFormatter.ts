export const formatPlatformContent = (content: string): string => {
  return content
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-black">$1</strong>')
    // Hashtags
    .replace(/#(\w+)/g, '<span class="text-blue-900">#$1</span>')
    // Line breaks
    .replace(/\\n\\n/g, '</p><p class="mb-4 text-black">')
    .replace(/\\n/g, '<br />')
    // Wrap in paragraph if not already wrapped
    .replace(/^([^<].*)/gm, '<p class="mb-4 text-black">$1</p>');
};