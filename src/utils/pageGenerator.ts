import { User } from 'netlify-identity-widget';

interface PageData {
  title: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
}

interface GeneratedPage {
  title: string;
  slug: string;
  createdAt: string;
}

const GENERATED_PAGES_KEY = 'generated_pages';

export function getGeneratedPages(): GeneratedPage[] {
  const pagesJson = localStorage.getItem(GENERATED_PAGES_KEY);
  return pagesJson ? JSON.parse(pagesJson) : [];
}

function addGeneratedPage(page: GeneratedPage): void {
  const pages = getGeneratedPages();
  pages.push(page);
  localStorage.setItem(GENERATED_PAGES_KEY, JSON.stringify(pages));
}

export function removeGeneratedPage(slug: string): void {
  const pages = getGeneratedPages();
  const filteredPages = pages.filter(page => page.slug !== slug);
  localStorage.setItem(GENERATED_PAGES_KEY, JSON.stringify(filteredPages));
}

export async function generatePage(pageData: PageData, user: User): Promise<void> {
  if (!user || !user.token?.access_token) {
    throw new Error('Not authenticated');
  }

  try {
    const response = await fetch('/.netlify/functions/commit-page', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token.access_token}`
      },
      body: JSON.stringify({
        content: pageData.body,
        path: `${pageData.slug}.html`
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate page');
    }

    const result = await response.json();

    addGeneratedPage({
      title: pageData.title,
      slug: pageData.slug,
      createdAt: new Date().toISOString()
    });

    return result;
  } catch (error) {
    console.error('Failed to generate page:', error);
    throw error;
  }
}