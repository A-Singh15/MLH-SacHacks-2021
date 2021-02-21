import firebase, { firestore } from './firebasecontext'


const fire = firebase

const db = fire.firestore();


function newUserDefaults(user) {
    return {
        username: user.username,
        email: user.email,
        orgname: user.orgname,
        orgweb: user.orgweb,
        created: fire.firestore.Timestamp.now(),
        'last-login': fire.firestore.Timestamp.now(),
        new: true
    }

}

export async function getUserfromRef(userRef) {
    let user = await userRef.get()
    if (user.exists) {
        return user.data()
    } else {
        console.error('user does not exist!!!')
    }
}

export function getUserfromUid(uid) {
    return db.doc('users/' + uid).get()
}







export function createNewUser(userdata) {
    const userRef = db.collection('users').doc(userdata.uid)
    console.log('creating user with: ', userdata)

    return userRef.set(newUserDefaults(userdata))
        .catch(e => {
            console.log('error creating new user')
            console.log(e)
        })
}

