  
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