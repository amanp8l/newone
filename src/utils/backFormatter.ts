export const backFormatter = (html: string): string => {
    return html
      // Remove paragraph tags completely, preserving their content
        .replace(/<p class="mb-4 text-black">(.*?)<\/p>/gs, '$1')
        // Unwrap strong tags (bold)
        .replace(/<strong class="font-semibold text-black">(.*?)<\/strong>/g, '**$1**')
        // Unwrap hashtag spans
        .replace(/<span class="text-blue-900">#(\w+)<\/span>/g, '#$1')
        // Convert line breaks to newline characters
        .replace(/<br \/>/g, '\n')
        // Replace multiple consecutive newlines with double newline
        .replace(/\n{3,}/g, '\n\n')
        // Trim any extra whitespace
        .trim();
    };