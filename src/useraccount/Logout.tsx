import auth from '@react-native-firebase/auth'

export const logoutUser=() =>{
        auth()
        .signOut()
        .then(()=> console.log("user signed out"))
    }

 

