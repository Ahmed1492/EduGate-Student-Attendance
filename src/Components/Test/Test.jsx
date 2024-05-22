// import React, { useEffect, useState } from "react";
// import QRCode from "qrcode.react";

// export const Test = () => {
//   const [location, setLocation] = useState({
//     loaded: false,
//     coordinates: { lat: "", lng: "" },
//   });

//   const onSuccess = (location) => {
//     setLocation({
//       loaded: true,
//       coordinates: {
//         lat: location.coords.latitude,
//         lng: location.coords.longitude,
//       },
//     });
//   };

//   const onError = (error) => {
//     setLocation({
//       loaded: true,
//       error,
//     });
//   };

//   const getCurrentLocation = () => {
//     if (!("geolocation" in navigator)) {
//       onError({
//         code: 0,
//         message: "Geolocation not supported",
//       });
//     }
//     navigator.geolocation.getCurrentPosition(onSuccess, onError);
//   };
//   const [currentTime, setCurrentTime] = useState("");
//   const getCurrentTime = () => {
//     const timer = setInterval(() => {
//       const now = new Date();
//       const formattedTime = now
//         .toISOString()
//         .replace("T", " ")
//         .substring(0, 23);
//       setCurrentTime(formattedTime);
//     }, 1000); // Update every second

//     return () => clearInterval(timer);
//   };
//   useEffect(() => {
//     getCurrentLocation();
//     getCurrentTime();
//   }, []);
//   return (
//     <div>
//       <h4>Your Location:</h4>
//       {location.loaded ? (
//         location.error ? (
//           <div>
//             Error: The Geolocation service failed: {location.error.message}
//           </div>
//         ) : (
//           <div>
//             Latitude: {location.coordinates.lat}, Longitude:{" "}
//             {location.coordinates.lng}
//           </div>
//         )
//       ) : (
//         <div>Loading Location...</div>
//       )}
//       <div>
//         <h4>Current Time:</h4>
//         <div>{currentTime}</div>
//       </div>
//     </div>
//   );
// };
// import React from "react";

// export const Test = () => {
//   const encodedData = `ÖØÉ¤z¨£aÊÆÑÌ¢z  s¡¢©¦£ `;
//   let key = "MudarTamakiMohamedAhmedSalama";

//   function decodeData(encodedData, key) {
//     let decodedData = "";
//     let keyIndex = 0;

//     for (let i = 0; i < encodedData.length; i++) {
//       let encodedChar = encodedData.charAt(i);
//       let keyChar = key.charAt(keyIndex % key.length);

//       let decodedCharAscii = encodedChar.charCodeAt(0) - keyChar.charCodeAt(0);

//       // Ensure the decoded ASCII value is within the valid range
//       decodedCharAscii = (decodedCharAscii + 256) % 256;

//       let decodedChar = String.fromCharCode(decodedCharAscii);
//       decodedData += decodedChar;

//       keyIndex++;
//     }

//     return decodedData;
//   }

//   let decodedData = decodeData(encodedData, key);
//   console.log(" result =>", decodedData);

//   return <div>Test</div>;
// };

import React from "react";
var decodedStringBtoA = "Hello World!";

// Encode the String
var encodedStringBtoA = btoa(decodedStringBtoA);

// console.log(encodedStringBtoA);

// Define the string
var encodedStringAtoB = "SGVsbG8gV29ybGQh";

// Decode the String
var decodedStringAtoB = atob(encodedStringAtoB);

// console.log(decodedStringAtoB);

export const Test = () => {
  return <div>Test</div>;
};
