// Utility for safe video URL formatting and encoding across all browsers (Chrome, Safari, Firefox)
export function getVideoUrl(path) {
  if (!path) return '';
  // Split query or fragment identifier if present
  const parts = path.split('#');
  const basePath = parts[0];
  const fragment = parts[1] ? `#${parts[1]}` : '';

  // Encode special characters (spaces, emojis, parentheses)
  const encodedPath = encodeURI(basePath);
  return `${encodedPath}${fragment}`;
}
