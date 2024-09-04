export function truncateText(text, charLimit) {
  if (text.length <= charLimit) return text;
  return text.slice(0, charLimit) + '...';
}

export function convertToIST(dateString) {
  const options = {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
  };

  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options);
}