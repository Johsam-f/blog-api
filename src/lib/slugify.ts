export function slugify(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")       // Remove non-word characters
      .replace(/\s+/g, "-")           // Replace spaces with hyphens
      .replace(/--+/g, "-");          // Remove multiple hyphens
  }
  