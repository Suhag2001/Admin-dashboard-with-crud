import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByNMfDnLYpfLC86AOu3nliPueBlaoWu48",
  authDomain: "mynetwork-a3e8d.firebaseapp.com",
  projectId: "mynetwork-a3e8d",
  storageBucket: "mynetwork-a3e8d.appspot.com",
  messagingSenderId: "369084214380",
  appId: "1:369084214380:web:c92991f3a4d52aaa087c49",
  measurementId: "G-RP3QM5LBKM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const provider2 = new OAuthProvider("apple.com");
provider2.addScope("email");
export { auth, provider, provider2 };
