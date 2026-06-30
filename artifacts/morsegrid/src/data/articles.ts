export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Article {
  slug: string;
  type: string;
  title: string;
  description: string;
  readTime: string;
  author: string;
  publishedOn: string;
  intro: string;
  sections: ArticleSection[];
  closing: string;
}

export const articles: Article[] = [];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
