type FileNode = {
  node: {
    id: string
    alt?: string
    image?: {
      url: string
    }
    url?: string
  }
}

type ImageVariant = {
  url: string
  alt: string
  variant: 'desktop' | 'mobile' | 'unknown'
}

// type DictKeys =
//   | 'home.title'
//   | 'home.description'
//   | 'products.cart'
//   | 'common.submit'
//   | 'common.cancel';

export function extractImageVariants(files: FileNode[]): ImageVariant[] {
  return files
    .map(({ node }) => {
      const url = node.image?.url || node.url || ''
      const alt = node.alt || ''
      const lower = `${url} ${alt}`.toLowerCase()

      let variant: ImageVariant['variant'] = 'unknown'
      if (lower.includes('desktop')) variant = 'desktop'
      else if (lower.includes('mobile')) variant = 'mobile'

      return { url, alt, variant }
    })
    .filter(({ url }) => url.length > 0)
}

export function getThumbUrl(url: string) {
  return (
    url.includes('?')
      ? `${url}&width=200&height=200&crop=center`
      : `${url}?width=200&height=200&crop=center`
  )
}

// export function t(dict: Record<string, any>, path: DictKeys): string {
//   return path.split('.').reduce((acc, key) => acc?.[key], dict) ?? path;
// }

type NestedDict = {
  [key: string]: string | number | boolean | NestedDict;
};

export function t(dict: NestedDict, path: string): string {
  const result = path.split('.').reduce<unknown>((acc, key) => {
    if (typeof acc === 'object' && acc !== null && key in acc) {
      return (acc as NestedDict)[key];
    }
    return undefined;
  }, dict);

  return typeof result === 'string' ? result : path;
}
