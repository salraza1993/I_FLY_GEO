import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textTransform',
  standalone: true
})
export class TextTransformPipe implements PipeTransform {

  transform(
    value: string | null | undefined,
    type: string = 'none'
  ): string {
    if (!value || typeof value !== 'string') return '';

    try {
      switch (type.toLowerCase()) {
        case 'capitalize':
          // Capitalize first letter of each word
          return value.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());

        case 'sentence-case':
        case 'sentence':
          // Capitalize first letter of first word only
          return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

        case 'lowercase':
        case 'lower':
          return value.toLowerCase();

        case 'uppercase':
        case 'upper':
          return value.toUpperCase();

        case 'camel-case':
        case 'camelcase':
          // Convert to camelCase (remove spaces, capitalize words except first)
          return value.toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (match, char) => char.toUpperCase());

        case 'kebab-case':
        case 'kebab':
          // Convert to kebab-case (lowercase with hyphens)
          return value.toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        case 'snake-case':
        case 'snake':
          // Convert to snake_case (lowercase with underscores)
          return value.toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '');

        case 'title-case':
        case 'title':
          // Title case (capitalize important words, skip articles/prepositions)
          const skipWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'is', 'it', 'of', 'on', 'or', 'the', 'to', 'up'];
          return value.toLowerCase()
            .split(' ')
            .map((word, index) => {
              if (index === 0 || !skipWords.includes(word)) {
                return word.charAt(0).toUpperCase() + word.slice(1);
              }
              return word;
            })
            .join(' ');

        case 'reverse':
          return value.split('').reverse().join('');

        case 'trim':
          return value.trim();

        case 'remove-spaces':
        case 'nospace':
          return value.replace(/\s+/g, '');

        case 'single-space':
          // Replace multiple spaces with single space
          return value.replace(/\s+/g, ' ').trim();

        case 'initials':
          // Get initials from words
          return value.split(/\s+/)
            .map(word => word.charAt(0).toUpperCase())
            .join('');

        case 'first-word':
          return value.split(/\s+/)[0] || '';

        case 'last-word':
          const words = value.split(/\s+/);
          return words[words.length - 1] || '';

        case 'word-count':
          return value.split(/\s+/).filter(word => word.length > 0).length.toString();

        case 'char-count':
        case 'length':
          return value.length.toString();

        case 'none':
        default:
          return value;
      }
    } catch (error) {
      console.error('TextTransformPipe: Error transforming text:', error);
      return value || '';
    }
  }
}
