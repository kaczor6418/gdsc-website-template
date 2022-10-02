import('./index').catch((e) => {
  return console.error(`Couldn't load 'index.js' file because of this error:`, e);
});
