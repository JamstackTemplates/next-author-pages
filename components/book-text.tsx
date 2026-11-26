import { books } from '../content/books';

const titles = [...new Set(books.map(book => book.title))].sort((a, b) => b.length - a.length);
const titlePattern = new RegExp(`(${titles.map(title => RegExp.escape(title)).join('|')})`, 'g');

export function BookText({ children }: { children: string }) {
  return children.split(titlePattern).map((part, index) => titles.includes(part) ? <em key={index}>{part}</em> : part);
}
