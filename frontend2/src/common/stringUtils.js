function formatUnixTimestamp (unix) {
  // if same day; 4:02 AM
  // if same week; Mon 4:02 AM
  // if same year; Jan 1
  // else (more than 1 year ago); Jan 2020
  const date = new Date(unix);
  const now = new Date();
  const diff = now - date;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffYears = now.getFullYear() - date.getFullYear();
  if (diffDays === 0) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  } else if (diffWeeks === 0) {
    return date.toLocaleDateString('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true });
  } else if (diffYears === 0) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
}

function formatFloatToTime (float) {
  // if < 1 hr, return x:xx
  // if >= 1 hr, return x:xx:xx
  const hours = Math.floor(float / 3600);
  const minutes = Math.floor((float % 3600) / 60);
  const seconds = Math.floor(float % 60);
  if (hours === 0) {
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  } else {
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}

export { formatUnixTimestamp, formatFloatToTime };
