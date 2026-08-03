export interface Devotional {
  title: string;
  date: string; // YYYY-MM-DD
  slug: string;
  tags?: string;
  quote?: string;
  quote_source?: string;
  opening: string;
  core: string;
  verses: string;
  application: string;
  prayer: string;
  author: string;
  cover?: string;
}
