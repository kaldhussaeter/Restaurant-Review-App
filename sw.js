const mainCache = "restaurant-reviews-v1";

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(mainCache).then((cache) => {
            self.currentCache = cache;
            return cache.addAll([
                'index.html',
                'restaurant.html',
                'css/styles.css',
                'js/dbhelper.js',
                'js/main.js',
                'js/restaurant_info.js',
                'data/restaurants.json',
                'img/1.jpg',
                'img/2.jpg',
                'img/3.jpg',
                'img/4.jpg',
                'img/5.jpg',
                'img/6.jpg',
                'img/7.jpg',
                'img/8.jpg',
                'img/9.jpg',
                'img/10.jpg'
            ]);
        }).catch((err) => {
            console.log("error in load files in cache", err);
        })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open('restaurant-reviews-v1')
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
