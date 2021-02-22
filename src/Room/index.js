import { useEffect, useState } from 'react';
import firebase from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';

export default function Room() {
  const { room } = useParams();
  const db = firebase.firestore();
  // const auth = firebase.auth();
  // const [user] = useAuthState(auth);
  const LiveSportCollection = db
    .collection('live')
    .doc(room)
    .collection('data');

  const [chats] = useCollectionData(
    LiveSportCollection.orderBy('createdAt', 'asc')
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    LiveSportCollection.add({
      user: 'test',
      text: formData.get('text'),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    e.target.reset();
  };

  const initialLiveChat = async () => {};
  useEffect(() => {
    initialLiveChat();
    return () => {};
  }, []);
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="text" placeholder="message..." />
        <button type="submit">Submit</button>
      </form>
      <ul>{chats && chats.map((item) => <li>{item.text}</li>)}</ul>
    </div>
  );
}
