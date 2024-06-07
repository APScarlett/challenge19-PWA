const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const {StaleWhileRevalidate} = require('workbox-strategies');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
//set up the asset cache
//we use the following to define the callback function that filters requests for caching
({request}) => ['style', 'script', 'worker'].includes(request.destination),
new StaleWhileRevalidate({
    //used to name the cache storage
  cacheName: 'asset=cache',
  plugins: [
      // the plugin will cache responses with specific headers up to max time frame of 30 days
    new CacheableResponsePlugin({
      statuses: [0,200],
    }),
  ],
});
