mapboxgl.accessToken = mapboxToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: campground.geometry.coordinates,
    zoom: 8
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker({ color: '#11b4da' })
    .setLngLat(campground.geometry.coordinates)
    .addTo(map);