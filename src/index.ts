import('./App').catch((e) => {
  return console.error(`Couldn't load application because of this error:`, e);
});
