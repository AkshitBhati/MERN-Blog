// import { useEffect, useState } from 'react'
// import { Button } from 'flowbite-react'
// import { AiFillGoogleCircle } from 'react-icons/ai'
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
// import { signInStart, signInFailure, signInSuccess } from '../redux/user/UserSlice'
// import { useDispatch } from 'react-redux'
// import { auth } from '../Config'
// import { useNavigate } from 'react-router-dom'

// const OAuth = () => {
//     const [value, setValue] = useState()

//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const handleGoogleClick = async() => {
//         const provider = new GoogleAuthProvider()
//         // provider.setCustomParameters({ prompt: 'selected_account' })
//         // try{
//         //     const result = await signInWithPopup(auth, provider)
//         //     console.log(result)
//         // }
//         // catch(err){
//         //     console.error(err)
//         // }

//         signInWithPopup(auth,provider ).then((data) => {
//             setValue(data.user.email)
//         })

//         const res = await fetch('/api/auth/google', {
//             method:"POST",
//             headers:{'Content-Type':"application/json"},
//             body:JSON.stringify({
//                 name:data.user.displayName,
//                 email:data.user.email,
//                 googlePhotoUrl:data.user.photoURL
//             })
//         })
//         const data = await res.json()
//         if(res.ok){
//             dispatch(signInSuccess(data))
//             navigate("/")
//         }
//     }

    
//   return (
     
//     <Button type='button' gradientDuoTone={"pinkToOrange"} outline onClick={handleGoogleClick}>
//         <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
//         Continue with Google
//     </Button>
//   )
// }

// export default OAuth

import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../Config';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/UserSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {

    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                })
            const data = await res.json()
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    } 
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
  )
}