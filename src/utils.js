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

export async function loadWholeStreamAsString(stream) {
  const textDecoder = new TextDecoder();
  let content = '';
  for await (const chunk of streamAsyncIterator(stream)) {
    content += textDecoder.decode(chunk);
  }
  return content;
}
