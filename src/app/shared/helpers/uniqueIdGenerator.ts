export function GenerateUniqueId(maxLength: number = 8): string {
  const alphanumericChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueId = '';
  for (let i = 0; i < maxLength; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    uniqueId += alphanumericChars.charAt(randomIndex);
  }

  return uniqueId;
}
