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

function formatUnixTimestamp2 (unix) {
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

function buildUpdateExpression (attributes) {
  const expressionAttributeValues = {};
  const updateExpressionParts = [];
  const expressionAttributeNames = {};
  let i = 0;
  for (const [key, value] of Object.entries(attributes)) {
    if (value != null) {
      const expressionAttributeKey = `:val${i}`;
      expressionAttributeValues[expressionAttributeKey] = value;
      expressionAttributeNames[`#${key}`] = key;
      if (value !== '') {
        updateExpressionParts.push(`#${key} = ${expressionAttributeKey}`);
      }
      i++;
    }
  }
  let updateExpression = updateExpressionParts.join(', ');
  if (updateExpression !== '') {
    updateExpression = 'SET ' + updateExpression;
  }
  return {
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
  };
}

function mapErrorDetails (error) {
  if (!error) return [];
  return error.details.map((detail) => detail.message);
}

export { formatUnixTimestamp, formatFloatToTime, formatUnixTimestamp2, uuid, splitText, translate, removeEmptyLines, buildUpdateExpression, mapErrorDetails };
