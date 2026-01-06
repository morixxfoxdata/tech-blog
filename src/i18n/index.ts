export const languages = {
  ja: '日本語',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'ja';

export const ui = {
  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.blog': 'ブログ',
    'nav.projects': 'プロジェクト',
    'nav.skills': 'スキル',
    'nav.about': 'About',

    // Common
    'common.readMore': '続きを読む',
    'common.tags': 'タグ',
    'common.search': '検索',
    'common.searchPlaceholder': '記事を検索...',
    'common.noResults': '記事が見つかりませんでした',
    'common.publishedAt': '公開日',
    'common.updatedAt': '更新日',

    // Blog
    'blog.title': 'ブログ',
    'blog.description': '技術記事やメモを書いています',
    'blog.allPosts': 'すべての記事',
    'blog.recentPosts': '最近の記事',
    'blog.series': 'シリーズ',
    'blog.prevPost': '前の記事',
    'blog.nextPost': '次の記事',

    // Projects
    'projects.title': 'プロジェクト',
    'projects.description': '過去の制作物',
    'projects.viewDemo': 'デモを見る',
    'projects.viewCode': 'コードを見る',

    // Skills
    'skills.title': 'スキル',
    'skills.description': '使用している技術スタック',

    // About
    'about.title': 'About',
    'about.description': '自己紹介',

    // Footer
    'footer.copyright': '© 2026 mcmc-tech. All rights reserved.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.about': 'About',

    // Common
    'common.readMore': 'Read more',
    'common.tags': 'Tags',
    'common.search': 'Search',
    'common.searchPlaceholder': 'Search articles...',
    'common.noResults': 'No articles found',
    'common.publishedAt': 'Published',
    'common.updatedAt': 'Updated',

    // Blog
    'blog.title': 'Blog',
    'blog.description': 'Technical articles and notes',
    'blog.allPosts': 'All Posts',
    'blog.recentPosts': 'Recent Posts',
    'blog.series': 'Series',
    'blog.prevPost': 'Previous',
    'blog.nextPost': 'Next',

    // Projects
    'projects.title': 'Projects',
    'projects.description': 'My past works',
    'projects.viewDemo': 'View Demo',
    'projects.viewCode': 'View Code',

    // Skills
    'skills.title': 'Skills',
    'skills.description': 'Tech stack I use',

    // About
    'about.title': 'About',
    'about.description': 'About me',

    // Footer
    'footer.copyright': '© 2026 mcmc-tech. All rights reserved.',
  },
} as const;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key] || key;
  };
}

export function getLocalizedPath(path: string, lang: Lang): string {
  // Remove leading slash and any existing locale prefix
  const cleanPath = path.replace(/^\//, '').replace(/^(ja|en)\//, '');
  return `/${lang}/${cleanPath}`;
}

export function getAlternateLocale(lang: Lang): Lang {
  return lang === 'ja' ? 'en' : 'ja';
}
