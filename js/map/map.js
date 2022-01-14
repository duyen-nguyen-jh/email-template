const MAPBOX_GEOCODING_API = `https://api.mapbox.com/geocoding/v5/mapbox.places`;

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2R1eWVuIiwiYSI6ImNreWQ2ZTBvdjBpNnEyb3VydWJnNWRsaTcifQ.-PM8nUrmQHu0dP3v5N5zoA";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
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

function getGeoInputOrigin() {
  const originText = document.getElementById("inputStart").value;
  const listSuggest = document.getElementById("originList");

  if (originText && originText.trim().length !== 0) {
    fetch(
      `${MAPBOX_GEOCODING_API}/${originText}.json?access_token=${mapboxgl.accessToken}`,
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
    fetch(
      `${MAPBOX_GEOCODING_API}/${destinationText}.json?access_token=${mapboxgl.accessToken}`,
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
  console.log(element);
  const inputOrigin = document.getElementById("inputStart");
  inputOrigin.value = element.place_name;
  toggleList("none", listSuggest);
}

function handleClickSuggestItemDestination(element, listSuggest) {
  const inputDes = document.getElementById("inputEnd");
  inputDes.value = element.place_name;
  toggleList("none", listSuggest);
}
