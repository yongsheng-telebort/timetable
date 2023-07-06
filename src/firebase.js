import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

//TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDdjZK_yJ4vEqQR9SOyJe6QmrpIU7fCM7o',
	authDomain: 'telebort-time-table.firebaseapp.com',
	projectId: 'telebort-time-table',
	storageBucket: 'telebort-time-table.appspot.com',
	messagingSenderId: '287248429342',
	appId: '1:287248429342:web:fa8517d38a61baf7a8190f'
};

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
