export function formatTimeDifference(timestamp: string) {
  const currentTime = new Date();
  const pastTime = new Date(timestamp + 'Z');
  const timeDifference = currentTime.getTime() - pastTime.getTime();

  // Convert milliseconds to seconds
  const seconds = Math.floor(timeDifference / 1000);

  // Calculate time differences
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 1) {
    return `${days} days ago`;
  } else if (hours > 1) {
    return `${hours} hours ago`;
  } else if (minutes > 1) {
    return `${minutes} minutes ago`;
  } else {
    return 'just now';
  }
} //move to utils
