import firebase from 'firebase/app'
import 'firebase/database'
import { useEffect, useState } from 'react'

let firebaseApp = null

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyDGv3d91kT9bB63LP-jBID9UFUVefBp5es',
    authDomain: 'stream49-apps.firebaseapp.com',
    databaseURL: 'https://stream49-apps-default-rtdb.firebaseio.com',
    projectId: 'stream49-apps',
    storageBucket: 'stream49-apps.appspot.com',
    messagingSenderId: '396996253722',
    appId: '1:396996253722:web:b91a0e76210788a85cd9a3',
    measurementId: 'G-GGQRF73YFZ'
  })
} else {
  firebaseApp = firebase.app()
}

export default firebaseApp

export const useRealtimeDatabase = (ref) => {
  const [data, setData] = useState({})
  useEffect(() => {
    const dbRef = firebase.database().ref(ref)
    console.log(dbRef)
    dbRef.on('value', (snapshot) => {
      const currentData = snapshot.val()
      console.log({ currentData })
      setData(currentData)
    })
    return () => {
      dbRef.off()
    }
  }, [])
  return data
}

export const usePresence = (accountId, userId) => {
  console.log({ accountId, userId })
  useEffect(() => {
    if (!accountId || !userId) {
      return false
    }
    const userStatusDatabaseRef = firebase
      .database()
      .ref('/presence/alunotv/' + accountId + '/' + userId)

    // Create a reference to the special '.info/connected' path in
    // Realtime Database. This path returns `true` when connected
    // and `false` when disconnected.
    firebase
      .database()
      .ref('.info/connected')
      .on('value', function (snapshot) {
        // If we're not currently connected, don't do anything.
        if (snapshot.val() == false) {
          return
        }

        userStatusDatabaseRef
          .onDisconnect()
          .remove()
          .then(function () {
            // The promise returned from .onDisconnect().set() will
            // resolve as soon as the server acknowledges the onDisconnect()
            // request, NOT once we've actually disconnected:
            // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

            // We can now safely set ourselves as 'online' knowing that the
            // server will mark us as offline once we lose connection.
            userStatusDatabaseRef.set(true)
            // userStatusDatabaseRef.set(isOnlineForDatabase)
          })
      })
    return () => {
      userStatusDatabaseRef.remove()
    }
  }, [accountId, userId])
}
