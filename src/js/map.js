document.addEventListener('DOMContentLoaded', function() {
  ymaps.ready(init);
  function init(){
    const myMap = new ymaps.Map("map", {
          center: [55.763153311148564,37.6227335316162],
          controls: [],
          zoom: 14
        });

    const myPlacemark = new ymaps.Placemark([55.769535, 37.639985], {}, {
          iconLayout: 'default#image',
          iconImageHref: './images/icon_placemark.svg',
          iconImageSize: [12, 12],
          iconImageOffset: [-15, -3]
        });

    myMap.geoObjects.add(myPlacemark);
  };
});
