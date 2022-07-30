import { load } from 'cheerio';

type OgpItem = { title: string; description: string; url: string; image: string }; // { [key: string]: string };

export async function fetchOgp(url: string): Promise<OgpItem> {
  const res = await fetch(url, { headers: { 'User-Agent': 'bot' } });
  const html = await res.text();

  const $ = load(html);
  const $metas = $('head meta');

  let ogpItem = {} as OgpItem;

  $metas.each((index, value) => {
    const property = $(value).attr('property');
    const content = $(value).attr('content');

    if (!content) {
      return;
    }

    if (property === 'og:title') {
      ogpItem = { ...ogpItem, title: content };
    }

    if (property === 'og:description') {
      ogpItem = { ...ogpItem, description: content };
    }
    if (property === 'og:image') {
      ogpItem = { ...ogpItem, image: content };
    }
    if (property === 'og:url') {
      ogpItem = { ...ogpItem, url: content };
    }
  });

  return ogpItem;
}
