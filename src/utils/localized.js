export function localized(value, lang) {
  if (value != null && typeof value === 'object' && !Array.isArray(value)) {
    return value[lang] ?? value.en ?? Object.values(value)[0] ?? '';
  }
  return value ?? '';
}
