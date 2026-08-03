declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  }
};

export const trackDevotionalRead = (title: string, date: string) => {
  // 1. Send custom event to GA4
  trackEvent('read_renungan', {
    devotional_title: title,
    devotional_date: date,
  });

  // 2. Send virtual page_view to GA4 so pop-up read counts as page view
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: `Renungan: ${title}`,
      page_location: `${window.location.origin}/renungan#${encodeURIComponent(title)}`,
      page_path: `/renungan/pop-up-detail`,
    });
  }
};
