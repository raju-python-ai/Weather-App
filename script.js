// 🕒 Live Clock
setInterval(() => {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById('live-time').textContent = time;
}, 1000);

// 📍 Get Location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, () => {
      document.getElementById('location').textContent = "Location unavailable";
    });
  } else {
    document.getElementById('location').textContent = "Geolocation not supported";
  }
}

function showLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
    .then(res => res.json())
    .then(data => {
      const place = data.address.city || data.address.town || data.address.village || data.address.state;
      const country = data.address.country;
      document.getElementById('location').textContent = `${place}, ${country}`;
    })
    .catch(() => {
      document.getElementById('location').textContent = "Location not found";
    });
}

// Run location 
getLocation();
