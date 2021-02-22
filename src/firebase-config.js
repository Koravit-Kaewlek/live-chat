import firebase from 'firebase';
let config = {};
config = {
  apiKey: 'AIzaSyDLW-JdjhJN5mfRXwD42IvhG6fcCPH1THw',
  authDomain: 'demo2-30fe6.firebaseapp.com',
  projectId: 'demo2-30fe6',
  storageBucket: 'demo2-30fe6.appspot.com',
  messagingSenderId: '963344896281',
  appId: '1:963344896281:web:e63cd421735725e931f588',
  measurementId: 'G-XRE1ZX2X2B',
}; // test

// config = {
//   apiKey: 'AIzaSyAnqQ72ugY6xdUdzUhQHSlOzi51j6iscsM',
//   authDomain: 'fir-35600.firebaseapp.com',
//   projectId: 'fir-35600',
//   storageBucket: 'fir-35600.appspot.com',
//   messagingSenderId: '1018439907716',
//   appId: '1:1018439907716:web:5a03a20fef384684d105d1',
//   measurementId: 'G-GM90XZ5ZWH',
// };
firebase.initializeApp(config);
export default firebase;
