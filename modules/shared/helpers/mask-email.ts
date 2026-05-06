export const maskEmail = (email: string): string => {
  const trimmed = email.trim();
  const at = trimmed.indexOf("@");
  if (at <= 0) return trimmed;
  const local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1);
  if (!domain) return trimmed;
  if (local.length <= 1) return `*@${domain}`;
  if (local.length === 2) {
    return `${local[0]}*@${domain}`;
  }
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
};
