import { useEffect, useState } from 'react';
import firebase from '../firebase-config';
import { useAuthState, AuthStateHook } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';

export default function Room() {
  const { room } = useParams();
  const db = firebase.firestore();
  const auth = firebase.auth();
  // const [user] = useAuthState(auth);
  const LiveSportCollection = db
    .collection('live')
    .doc(room)
    .collection('data');

  const [chats, loading, error] = useCollectionData(
    LiveSportCollection.orderBy('createdAt', 'asc')
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (auth.currentUser) {
      LiveSportCollection.add({
        user: auth.currentUser.email,
        text: formData.get('text'),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
        .then((res) => {})
        .catch((err) => {
          console.log('add message error!!', err);
        });
      e.target.reset();
    } else {
      alert('please login!!!');
    }
  };
  const loginFirebase = async (email, password) => {
    try {
      return await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      return err;
    }
  };
  const registerFirebase = async (email, password) => {
    try {
      return await auth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      return err;
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    registerFirebase(formData.get('email'), formData.get('password'))
      .then((res) => {
        console.log('handleRegister', res);
      })
      .catch((err) => {});
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    loginFirebase(formData.get('email'), formData.get('password'))
      .then((res) => {
        console.log('handleLogin', res);
      })
      .catch((err) => {});
  };
  const handleLogout = async (e) => {
    const res = await auth.signOut();
    console.log('handleLogout', res);
  };
  return (
    <div className="App">
      <label htmlFor="">{error}</label>
      <form onSubmit={handleRegister}>
        <div>Register</div>
        <div>
          <input type="text" name="email" placeholder="email..." />
        </div>
        <div>
          <input type="password" name="password" placeholder="password..." />
        </div>
        <button type="submit">Register</button>
      </form>
      <hr />
      <form onSubmit={handleLogin}>
        <div>Login</div>
        <div>
          <input type="text" name="email" placeholder="email..." />
        </div>
        <div>
          <input type="password" name="password" placeholder="password..." />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </form>
      <hr />
      <form onSubmit={handleSubmit}>
        <input type="text" name="text" placeholder="message..." />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {loading && <div>loading...</div>}
        {!loading &&
          chats &&
          chats.map((item, index) => (
            <li key={index}>{item.user + ' - ' + item.text}</li>
          ))}
      </ul>
    </div>
  );
}
