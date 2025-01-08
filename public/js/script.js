const socket = io();
console.log('hey')

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("send-location", { latitude, longitude });
    }, (error) => {
        console.error(error);
    }, {
        enableHighAccuracy: true,
        timeout: 5000
    });
}

const map = L.map("map").setView([0, 0], 10); 

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "©Prashant Saxena" 
}).addTo(map);

const marker = {};


socket.on("received-location",(data)=>{
    const{id,latitude, longitude }=data;
    map.setView([latitude,longitude],20);


    if(marker[id]){
        marker[id].setLatLng([latitude,longitude])
    }else{
        marker[id] =L.marker([latitude,longitude]).addTo(map);
    }
})