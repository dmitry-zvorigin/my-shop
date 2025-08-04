
export function buildBreadcrumbPath(items, base = '') {
  return items.map(item => ({
    name: item.name,
    url: `${base}/${item.slug}`,
  }));
}