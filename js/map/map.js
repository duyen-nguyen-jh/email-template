const MAPBOX_GEOCODING_API = `https://api.mapbox.com/geocoding/v5/mapbox.places`;
const MAPBOX_GET_DIRECTION_API = `https://api.mapbox.com/directions/v5/mapbox/driving`;

const oldOriginMarkers = [];
const oldDestinationMarkers = [];
let origin = null;
let destination = null;

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2R1eWVuIiwiYSI6ImNreWQ2ZTBvdjBpNnEyb3VydWJnNWRsaTcifQ.-PM8nUrmQHu0dP3v5N5zoA";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 14,
});

// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
  })
);

function clearOldList(list) {
  while (list.childNodes[0]) {
    list.removeChild(list.childNodes[0]);
  }
}

function toggleList(type, list) {
  list.style.display = type;
}

function clearAllOldMarker(list) {
  if (list.length !== 0) {
    list.forEach((marker) => {
      marker.remove();
    });
  }
}

function addMarkerOnMap(position, oldList, isOrigin) {
  const { center, text } = position;
  map.flyTo({
    center: center,
    essential: true,
  });

  const markerColor = isOrigin ? "#8a8acb" : "#3bb2d0";
  const marker = new mapboxgl.Marker({
    color: markerColor,
  })
    .setLngLat(center)
    .setPopup(new mapboxgl.Popup().setHTML(`<h1>${text}</h1>`))
    .addTo(map);
  oldList.push(marker);

  const markerDiv = marker.getElement();
  markerDiv.addEventListener("mouseenter", () => {
    marker.togglePopup();
  });
  markerDiv.addEventListener("mouseleave", () => {
    marker.togglePopup();
  });
}

function getGeoInputOrigin() {
  const originText = document.getElementById("inputStart").value;
  const listSuggest = document.getElementById("originList");

  if (originText && originText.trim().length !== 0) {
    const searchParam = encodeURIComponent(`${originText}`);
    fetch(
      `${MAPBOX_GEOCODING_API}/${searchParam}.json?access_token=${mapboxgl.accessToken}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("ukila", data);
        const suggestion = data.features;
        clearOldList(listSuggest);

        suggestion.forEach((element) => {
          let li = document.createElement("li");
          const placeName = element.place_name;
          li.appendChild(
            document.createTextNode(
              placeName.length > 55 ? `${placeName.slice(0, 55)} ...` : placeName
            )
          );
          li.addEventListener("click", function () {
            handleClickSuggestItemOrigin(element, listSuggest);
          });

          listSuggest.appendChild(li);
        });

        toggleList("block", listSuggest);
      })
      .catch((e) => console.log(e));
  }
}

function getGeoInputDestination() {
  const destinationText = document.getElementById("inputEnd").value;
  const listSuggest = document.getElementById("desList");

  if (destinationText && destinationText.trim().length !== 0) {
    const searchParam = encodeURIComponent(`${destinationText}`);
    fetch(
      `${MAPBOX_GEOCODING_API}/${searchParam}.json?access_token=${mapboxgl.accessToken}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const suggestion = data.features;
        clearOldList(listSuggest);

        suggestion.forEach((element) => {
          let li = document.createElement("li");
          const placeName = element.place_name;
          li.appendChild(
            document.createTextNode(
              placeName.length > 55 ? `${placeName.slice(0, 55)} ...` : placeName
            )
          );
          li.addEventListener("click", function () {
            handleClickSuggestItemDestination(element, listSuggest);
          });
          listSuggest.appendChild(li);
        });

        toggleList("block", listSuggest);
      })
      .catch((e) => console.log(e));
  }
}

function handleClickSuggestItemOrigin(element, listSuggest) {
  clearAllOldMarker(oldOriginMarkers);

  const inputOrigin = document.getElementById("inputStart");
  inputOrigin.value = element.place_name;
  toggleList("none", listSuggest);

  addMarkerOnMap(element, oldOriginMarkers, true);
  origin = { ...element };

  drawPolyline(origin, destination);
}

function handleClickSuggestItemDestination(element, listSuggest) {
  clearAllOldMarker(oldDestinationMarkers);

  const inputDes = document.getElementById("inputEnd");
  inputDes.value = element.place_name;
  toggleList("none", listSuggest);

  addMarkerOnMap(element, oldDestinationMarkers, false);
  destination = { ...element };

  drawPolyline(origin, destination);
}

function drawPolyline(origin, destination) {
  if (origin && destination) {
    fetch(
      `${MAPBOX_GET_DIRECTION_API}/${origin.center};${destination.center}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.code !== "Ok") {
          alert("Cannot find direction");
          map.getSource("route").setData({
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [],
            },
          });
          return;
        }
        const coordinates = data.routes[0].geometry.coordinates;
        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        };
        // if the route already exists on the map, we'll reset it using setData
        if (map.getSource("route")) {
          map.getSource("route").setData(geojson);
        }
        // otherwise, we'll make a new request
        else {
          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: geojson,
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#3887be",
              "line-width": 5,
              "line-opacity": 0.75,
            },
          });
        }
      })
      .catch((e) => console.log(e));
  }
}
