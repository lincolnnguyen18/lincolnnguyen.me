import { v4 as uuidv4 } from 'uuid';

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

function formatUnixTimestampFull (unix) {
  // e.g. "January 1, 2022 at 7:00 AM"
  const date = new Date(unix);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
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

function uuid () {
  return uuidv4();
}

function splitText (text) {
  const chunks = [];
  let chunk = '';
  const stopChars = ['\n', '「', '"', '»', '«', '」', '。', '.', ',', ' ', '!', '?', '？', '！', '，', '、', '；', ';', '：', ':', '…', '—'];
  for (let i = 0; i < text.length; i++) {
    chunk += text[i];
    if (((chunk.length > 600 && (stopChars.includes(text[i]))) || i === (text.length - 1))) {
      chunks.push(chunk);
      chunk = '';
    } else if (chunk.length > 700) {
      // find index of first stopChar in reverse
      for (let j = i; j > i; j--) {
        if (stopChars.includes(text[j])) {
          chunks.push(chunk.substring(i, j));
          chunk = '';
          break;
        }
      }
      for (let j = i; j > i; j--) {
        if (text[j] === ' ') {
          chunks.push(chunk.substring(i, j));
          chunk = '';
          break;
        }
      }
      chunks.push(chunk);
      chunk = '';
    }
  }
  return chunks;
}

async function translate (text, tl = 'en') {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  const json = await res.json();
  const srcLang = json[2];
  const pieces = json[0];
  let translated = [];
  for (let i = 0; i < pieces.length; i++) {
    translated.push(pieces[i][0]);
  }
  translated = translated.join('');
  return { translated, srcLang };
}

function removeEmptyLines (text) {
  return text.split('\n').filter(line => line.trim().length > 0).join('\n');
}

function getActionName (action) {
  return action.type.split('/')[1];
}

function formatStringForTimer (time) {
  // given 12, return 00:00:12
  // given 120, return 00:01:20
  // given 1200, return 00:12:00
  // given 12041241, return 04:12:41

  // convert time to string
  // remove all non-digit characters
  // keep only last 6 digits
  // pad with 0s in beginning until length is 6
  // insert colons
  time = time.toString().replace(/\D/g, '').slice(-6);
  time = time.padStart(6, '0');
  time = time.slice(0, 2) + ':' + time.slice(2, 4) + ':' + time.slice(4, 6);
  return time;
}

function openNotification (title, message) {
  if (!window.Notification) {
    alert(`${title}: ${message}`);
  } else {
    if (Notification.permission !== 'granted') return;
    const notification = new Notification(title, {
      body: message,
    });
    notification.onclick = function () {
      window.focus();
      notification.close();
    };
  }
}

export { formatUnixTimestamp, formatFloatToTime, formatUnixTimestampFull, uuid, splitText, translate, removeEmptyLines, getActionName, formatStringForTimer, openNotification };
