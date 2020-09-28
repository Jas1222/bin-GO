import Firebase from "firebase";


export function initialiseFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyDl7mAfvrVKt5N8cosi6HF0nWuppHTiyFg",
    authDomain: "bin-go-ffda5.firebaseapp.com",
    databaseURL: "https://bin-go-ffda5.firebaseio.com",
    projectId: "bin-go-ffda5",
    storageBucket: "bin-go-ffda5.appspot.com",
    messagingSenderId: "866825843191",
    appId: "1:866825843191:web:c15b96385af3e4a8da3ef2",
    measurementId: "G-KQCBNGQQJ0"
  };

  if (Firebase.apps.length === 0 ) {
    try {
      Firebase.initializeApp(firebaseConfig);
    } catch (err) {
      console.warn('!! failed to init fb', err)
    }
  }
}

export function submitBinLocation({ latitude, longitude }) {
  Firebase.database().ref('bins/').push({
    latitude, longitude
  });
}

export function fetchBinLocations() {
  const data = []

  return new Promise((resolve, reject) => {
    Firebase.database().ref('bins/').once('value', (snapshot) => {
      snapshot.forEach((bin) => {
        const binParsed = bin.val();
        data.push(binParsed);
      });
      return resolve(data)
    })
  })
}