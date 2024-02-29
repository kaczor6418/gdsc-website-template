import { NetworkFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';

// eslint-disable-next-line no-undef
declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);
registerRoute(() => {
  return true;
}, new NetworkFirst({ cacheName: 'gdsc' }));
