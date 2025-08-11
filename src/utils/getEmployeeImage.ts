/**
 * Takes raw base64 input and returns a properly formatted URI
 * usable in React Native's <Image /> component.
 *
 * @param {string} rawBase64 - The raw base64 image string (with or without prefix or b'')
 * @returns {string|null} - Data URI formatted base64 string or null if invalid
 */
export function getEmployeeImage(
  rawBase64: string | false | undefined,
): string | null {
  if (!rawBase64 || typeof rawBase64 !== 'string') return null;

  // Remove Python-style byte literal b'' if present
  const cleaned = rawBase64.trim().replace(/^b'|"|'$/g, '');

  // Detect MIME type (just the first few characters are usually enough)
  const mimeSniff = cleaned.slice(0, 5);
  let mimeType;

  switch (mimeSniff) {
    case '/9j/4': // JPEG
      mimeType = 'image/jpeg';
      break;
    case 'iVBOR': // PNG
      mimeType = 'image/png';
      break;
    case 'R0lGO': // GIF
      mimeType = 'image/gif';
      break;
    case 'UklGR': // WebP
      mimeType = 'image/webp';
      break;
    case 'Qk02U': // BMP
      mimeType = 'image/bmp';
      break;
    case 'PD94b': // SVG
      mimeType = 'image/svg+xml';
      break;
    default:
      console.warn('Unknown image type based on base64 signature');
      mimeType = 'application/octet-stream'; // fallback
  }

  return `data:${mimeType};base64,${cleaned}`;
}
