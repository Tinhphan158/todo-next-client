export const stripHtml = (html: string): string =>
  html.replace(/<[^>]*>/g, "").trim();

export const getPlainTextLength = (html: string): number =>
  stripHtml(html).length;
