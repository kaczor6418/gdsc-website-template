  
export async function* streamAsyncIterator(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const {done, value} = await reader.read();
      if(done) {
        return void 0;
      }
      yield value;
    }
  }
  finally {
    reader.releaseLock();
  }
}

export async function loadWholeStream(stream) {
  const content = [];
  for await (const chunk of streamAsyncIterator(stream)) {
      const translatedChunk = [];
      for(const charCode of chunk) {
          translatedChunk.push(String.fromCharCode(charCode));
      }
      content.push(...translatedChunk);
  }
  return content;
}

export function rippleEffect(element, e) {
  const ripple = document.createElement('span');
  const styleWrapper = document.createElement('style');
  const { left, top, width, height } = element.getBoundingClientRect();
  styleWrapper.innerHTML = styles;
  ripple.appendChild(styleWrapper);
  ripple.className = 'ripple';
  if (e.offsetX === 0 && e.clientY === 0) {
    ripple.style.left = `${width / 2}px`;
    ripple.style.top = `${height / 2}px`;
  } else {
    ripple.style.left = `${e.clientX - left}px`;
    ripple.style.top = `${e.clientY - top}px`;
  }
  element.appendChild(ripple);
  window.setTimeout(() => {
    ripple.remove();
  }, CONSTANTS.TRANSITION_DURATION_LONG);
}