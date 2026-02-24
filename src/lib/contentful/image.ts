import type { ContentfulAsset } from './types';

export function getContentfulImageUrl(asset?: ContentfulAsset | null) {
  if (!asset?.url) {
    return null;
  }
  if (asset.url.startsWith('//')) {
    return `https:${asset.url}`;
  }
  return asset.url;
}
