export const getUrlParameters = (url: string) => {
  const [path, params] = (url || '').split('?')
  const urlSearchParams = new URLSearchParams(params)
  return {
    path: path,
    ...Object.fromEntries(urlSearchParams.entries()),
  }
}

export const slugify = (input: string) => {
  if (!input) {
    return
  }

  // make lower case and trim
  let slug = input.toLowerCase().trim()

  // replace invalid chars with spaces
  slug = slug.replace(/[^a-z0-9\s-]/g, ' ')

  // replace multiple spaces or hyphens with a single hyphen
  slug = slug.replace(/[\s-]+/g, '-')

  return slug
}

export const IMAGE_ALT_TAG_DELIMITER = '?alt='

export const getImageAttributes = (image: string) => {
  const [src, alt] = (image || '').split(IMAGE_ALT_TAG_DELIMITER)

  return {
    src: src || '/placeholder.png',
    alt,
  }
}
