export const backFormatter = (html: string): string => {
    return html
      // Convert headers
        .replace(/<h1 class="text-3xl font-bold text-black mb-6">(.*?)<\/h1>/g, '# $1')
        .replace(/<h2 class="text-2xl font-semibold text-black mb-4">(.*?)<\/h2>/g, '## $1')
        .replace(/<h3 class="text-xl font-semibold text-black mb-3">(.*?)<\/h3>/g, '### $1')
        // Convert bold text
        .replace(/<strong class="font-semibold text-black">(.*?)<\/strong>/g, '**$1**')
        // Remove paragraph tags and replace with line breaks
        .replace(/<p class="mb-4 text-black">(.*?)<\/p>/g, '$1\n\n')
        // Replace line break tags
        .replace(/<br \/>/g, '\n')
        // Trim any extra whitespace
        .trim();
    };