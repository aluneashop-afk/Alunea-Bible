import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  type?: string;
  jsonLd?: Record<string, any>;
}

export function SEOHead({
  title,
  description = "Aplikasi Alkitab Digital Online dengan Terjemahan Baru (TB), Bahasa Indonesia Masa Kini (BIMK/TM), dan King James Version (KJV). Dilengkapi renungan harian dan pencarian ayat Alkitab.",
  keywords = "Alkitab online, Alkitab digital, Terjemahan Baru, Renungan Harian, Ayat Alkitab, Alkitab Indonesia, KJV, BIMK, Alunea",
  canonicalUrl,
  type = "website",
  jsonLd,
}: SEOHeadProps) {
  useEffect(() => {
    const defaultTitle = "Alkitab Alunea - Alkitab Digital & Renungan Harian";
    const fullTitle = title ? `${title} | Alkitab Alunea` : defaultTitle;
    document.title = fullTitle;

    // Helper function to update or insert meta tag
    const updateMeta = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta
    updateMeta('name', 'description', description);
    updateMeta('name', 'keywords', keywords);

    // OpenGraph meta
    updateMeta('property', 'og:title', fullTitle);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:type', type);
    updateMeta('property', 'og:site_name', 'Alkitab Alunea');
    updateMeta('property', 'og:locale', 'id_ID');

    // Twitter meta
    updateMeta('name', 'twitter:card', 'summary_large_image');
    updateMeta('name', 'twitter:title', fullTitle);
    updateMeta('name', 'twitter:description', description);

    // Canonical Link
    const currentUrl = canonicalUrl || window.location.href;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // JSON-LD Structured Data
    if (jsonLd) {
      let scriptTag = document.querySelector('#seo-structured-data') as HTMLScriptElement;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'seo-structured-data';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    }
  }, [title, description, keywords, canonicalUrl, type, jsonLd]);

  return null;
}
