import './account.scss';


import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Joi from 'joi';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useSetRecoilState,
    useRecoilValue,
    useRecoilState,
} from 'recoil';

import firebase, { fireauth } from '../../utils/firebasecontext'
import { getUserfromUid, createNewUser } from '../../utils/firebaseFunctions'
import {
    currentModeAtom,
    userCreateValuesAtom,
    userLoginValuesAtom,
    userUIDFromFirebaseAtom,
    userData_username,
    userLoggedInAtom
} from '../../utils/atoms'
import './account.scss';


import anonpng from '../../assets/login/anon.png';
import gpng from '../../assets/login/google.png';



function toastErr(msg) {
    toast.error(msg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

const loginButtonSvg = (
    <svg id='loginButtonSvg' width="120" height="120" viewBox="0 0 120 120" >
        <rect x="0.5" y="0.5" width="119" height="119" rx="29.5" stroke="black" />
        <path d="M93.7678 61.7678C94.7441 60.7915 94.7441 59.2085 93.7678 58.2322L77.8579 42.3223C76.8816 41.346 75.2986 41.346 74.3223 42.3223C73.346 43.2986 73.346 44.8816 74.3223 45.8579L88.4645 60L74.3223 74.1421C73.346 75.1184 73.346 76.7014 74.3223 77.6777C75.2986 78.654 76.8816 78.654 77.8579 77.6777L93.7678 61.7678ZM27 62.5H92V57.5H27V62.5Z" fill="black" />
    </svg>
)

const createUserSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(26)
        .required(),
    email: Joi.string()
        .email({ tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.string()
        .min(8)
        .max(26)
        .required(),
    orgname: Joi.string()
        .min(3)
        .max(26)
        .required(),
    orgweb: Joi.string()
        .min(3)
        .max(26)
        .required(),


})

const signSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.required()

})

/**
 * ANCHOR ENTERBUTTON
 * 
 */

function EnterButton(props) {
    //const isLoggedIn = props.isLoggedIn;
    let history = useHistory();
    const mode = useRecoilValue(currentModeAtom)
    const userUID = useRecoilValue(userUIDFromFirebaseAtom)
    const userCreateValues = useRecoilValue(userCreateValuesAtom)
    const userLoginValues = useRecoilValue(userLoginValuesAtom)
    var handleClick = (e) => {
        console.log('hello, handleclick is not set for enter button!!!')
    }

    function emailsignin(values) {
        fireauth.signInWithEmailAndPassword(values.email, values.password)
            .then(handleSuccess)
            .catch(handleError);
    }

    function emailsignup(values) {
        console.log('sign up time', values)
        fireauth.createUserWithEmailAndPassword(values.email, values.password)
            .then(handleSuccess)
            .catch(handleError);
    }

    if (mode === 'signin' || mode === 'signup') {
        handleClick = (e) => {
            console.log('sign in')
            const { error, value } = signSchema.validate(userLoginValues)
            if (error) {
                console.log(error)
                toastErr(error.message)
            } else {
                if (mode === 'signin') {
                    emailsignin(value)
                } else {
                    emailsignup(value)
                }
            }
        }
    } else if (mode === 'createuser') {

        handleClick = (e) => {
            const { error, value } = createUserSchema.validate(userCreateValues)
            if (error) {
                console.log(error)
                toastErr(error.message)
                return
            } else {
                console.log('createuser')
                console.log({ ...value, uid: userUID })
                createNewUser({ ...value, uid: userUID })
                    .then(item => {
                        console.log('acc created')
                        history.push('/dashboard')
                    })
            }

        }

    } else if (mode === 'continue') {
        handleClick = (e) => {
            history.push('/dashboard')
        }
    } else {
        console.log('err how did u get here?? ', props)
    }
    return (
        <button id='loginbutton'
            onClick={handleClick}
        >
            {loginButtonSvg}
        </button>
    )

}

/**
 * 
 *  ANCHOR: LOGIN FLOW LOGIC
 * 
 
 // check if user is logged in (auth change)
 
 // true: show user card page
 //     check if user has acc
 //         true: continue
 //         false: prompt create acc platform
 //             then goto dashboard
 // then set enter btn as goto daschord
 
 // false: show regular login page
 //     check if signin
 //         true: prompt signin platform
 //             set btn as login
 //         false: prompt signup platform
 //             set btn as sign up
 // then wait for auth change
 */


/**
 * ANCHOR: LOGIN FUNCTION
 * 
 * 
 * 
 * 
 */

export default function Login() {

    const [loading, setLoading] = useState(true)
    const [hasAccount, setHasAccount] = useState(123)

    const [loggedIn, setLoggedIn] = useRecoilState(userLoggedInAtom)
    const [mode, setMode] = useRecoilState(currentModeAtom)
    const setUserUID = useSetRecoilState(userUIDFromFirebaseAtom)
    const [username, setUserData_username] = useRecoilState(userData_username)


    function setUserInformation({ username }) {
        setUserData_username(username)
    }

    //listen to auth change// check if user is logged in
    useLayoutEffect(() => {
        console.log('listen to auth change')
        fireauth.onAuthStateChanged(user => {
            //wait for auth to check if user is logged in


            if (user) {
                //user is logged in
                if (!loggedIn) {
                    setLoggedIn(true)
                }

                //check if acc exists
                if (!loading) {
                    setLoading(true)
                }
                setUserUID(user.uid)
                getUserfromUid(user.uid)
                    .then(data => {
                        console.log(user.uid, data)
                        if (data.exists) {
                            setHasAccount(true)
                            setUserInformation({
                                username: data.get('username'),
                            })
                        } else {
                            setHasAccount(false)
                        }
                        if (loading) {
                            setLoading(false)
                        }

                    })
            } else {
                //user is not logged in

                setLoading(false)

                if (loggedIn) {
                    setLoggedIn(false)
                    if (!loading) {
                        setLoading(true)
                    }
                }
            }
        })
    }, [])


    useEffect(() => {
        //wait for auth before showing anything
        if (loading) {
            //show loading screen
            console.log('loading')
        } else {
            if (loggedIn) {
                //user is logged in
                console.log('logged in')
                //now waiting if user has acc (still loading)
                if (hasAccount !== 123) {
                    if (hasAccount) {
                        //acc is valid
                        //show user card page
                        console.log('acc valid')
                        //enter button is continue
                        setMode('continue')
                    } else {
                        //acc is not valid
                        //show creation page
                        console.log('acc not valid')
                        //enter button is createuser
                        setMode('createuser')
                    }
                }
            } else {
                //user is not logged in
                //show user login page
                console.log('not logged in')
                //enter button is either signin or signup

            }
        }
    }, [loading, loggedIn, hasAccount, setMode])



    var platform;
    var loginPlatformLeft;

    function signout() {
        //reset login message
        fireauth.signOut().then(() => {
            setMode('signin')
            setLoggedIn(false)
        })
            .catch(handleError);
    }

    //wait for auth before showing anything
    if (loading) {
        //show loading screen
        loginPlatformLeft = (
            <>
                <div className='login-form-title dutch-white'>
                    loading...
                </div>
            </>
        )
    } else {
        if (loggedIn) {
            //user is logged in
            //now waiting if user has acc (still loading)
            if (hasAccount !== 123) {

                if (hasAccount) {
                    //acc is valid
                    //show user card page
                    loginPlatformLeft = (
                        <>
                            <div className='login-form-title dutch-white'>
                                welcome!
                            </div>
                            <div className='login-username-title'>
                                USERNAME
                            </div>
                            <div className='login-username'>
                                {username}
                            </div>

                            <div className="here-button login-signout-create" onClick={signout}>
                                <span>NOT</span> YOUR ACCOUNT? SIGN <span className='dutch-white'>OUT</span>
                            </div>
                        </>
                    )
                } else {
                    //acc is not valid
                    //show creation page
                    loginPlatformLeft = <UserCreatePlatform />
                    platform = (
                        <div id='login-platform'
                            style={{
                                width: '1331.76px',
                                left: '32vw',
                                height: '430.62px'
                            }}
                        >

                            <div className='login-platform-left  create'>
                                {loginPlatformLeft}
                            </div>

                            <div className='login-platform-right'>
                                <span >
                                    <EnterButton />
                                </span>
                            </div>
                        </div>
                    )
                }
            }
        } else {
            //user is not logged in
            //show user login page
            if (mode === 'signin' || mode === 'signup') {

                loginPlatformLeft = <LoginForm></LoginForm>
            } else {
                loginPlatformLeft = (
                    <div className='login-form-title dutch-white'>
                        uh oh! pls refresh
                    </div>
                )
            }
        }
    }
    if (!platform) {

        platform = (
            <div id='login-platform'>

                <div className='login-platform-left'>
                    {loginPlatformLeft}
                </div>

                <div className='login-platform-right'>
                    <span >
                        <EnterButton />
                    </span>
                </div>
            </div>
        )
    }

    return (
        <div className="login app-page" >
            {platform}
        </div>
    )

}

function handleSuccess(result) {
    console.log('need to implement success!!')
}
function handleError(err) {
    toastErr(err.msg)
}

/**
 * 
 * ANCHOR: LOGINFORM
 * 
 */

function LoginForm() {

    const [mode, setMode] = useRecoilState(currentModeAtom)
    const setUserLoginValues = useSetRecoilState(userLoginValuesAtom)

    const { register, watch } = useForm();
    const watchAllFields = watch();

    useEffect(() => {
        setUserLoginValues(watchAllFields)
    }, [watchAllFields])

    function anonsignin() {
        fireauth.signInAnonymously()
            .then(handleSuccess)
            .catch(handleError);
    }

    function googlesignin() {
        var provider = new firebase.auth.GoogleAuthProvider();
        fireauth.signInWithPopup(provider)
            .then(handleSuccess)
            .catch(handleError);

    }

    const altsignin = (
        <div className='alternate-login'>
            <div className='alternate-login-label'>
                <span className='dutch-white'>OR</span> SIGN IN WITH:
            </div>
            <img className='alternate-login-png' src={gpng}
                alt='google login logo'
                onClick={googlesignin}
            />

            <img className='alternate-login-png' src={anonpng}
                onClick={anonsignin}
                alt='anon mask' />
        </div>
    )

    return (
        <>
            <form id='login-form' onSubmit={e => {
                e.preventDefault()
            }}>
                <div className="login-form-wrapper">
                    <label className="login-form-label" htmlFor="email">EMAIL</label>
                    <input ref={register} id="email" name="email" type="email" className="login-form" />
                </div>
                <div className="login-form-wrapper">
                    <label className="login-form-label" htmlFor="password">PASSWORD</label>
                    <input ref={register} id="password" name="password" type="password" className="login-form" />
                </div>
            </form>
            {altsignin}
            <div className='here-button'
                onClick={e => {
                    if (mode === 'signin') {
                        setMode('signup')
                    } else if (mode === 'signup') {
                        setMode('signin')
                    }

                }}
            >

                <span>DONT</span> HAVE AN ACCOUNT? {mode === 'signin' ? ' SIGN IN ' : ' SIGN UP '} <span className='dutch-white'>HERE</span>
            </div>

        </>
    )
}

/**
 * ANCHOR: USERCREATEPLATFORM
 * 
*/

function UserCreatePlatform(props) {

    const setUserValues = useSetRecoilState(userCreateValuesAtom)
    const setMode = useSetRecoilState(currentModeAtom)
    const setLoggedIn = useSetRecoilState(userLoggedInAtom)

    const { register, watch, control } = useForm();
    const watchAllFields = watch(undefined, {
        username: "",

    });
    const watchPic = watch('profilePicture');


    useEffect(() => {
        console.log(watchAllFields)
        setUserValues(watchAllFields)
    }, [setUserValues, watchAllFields])

    function signout() {
        //reset login message
        fireauth.signOut().then(() => {
            setMode('signin')
            setLoggedIn(false)
        })
            .catch(handleError);
    }

    return (//new user creation screen
        <>
            <div>

                <form id='user-create' onSubmit={e => {
                    e.preventDefault()
                }}>
                    <div className="login-form-wrapper">
                        <label className="login-form-label" htmlFor="email">EMAIL</label>
                        <input ref={register} id="email" name="email" type="email" className="login-form" />
                    </div>
                    <div className="login-form-wrapper">
                        <label className="login-form-label" htmlFor="username">USERNAME</label>
                        <input ref={register} id="username" name="username" className="login-form" />
                    </div>
                    <div className="login-form-wrapper">
                        <label className="login-form-label" htmlFor="password">PASSWORD</label>
                        <input ref={register} id="password" name="password" type="password" className="login-form" />
                    </div>
                </form>
                <div className="here-button login-signout-create" onClick={signout}>
                    <span>NOT</span> YOUR ACCOUNT? SIGN <span className='dutch-white'>OUT</span>
                </div>
            </div>

            <div>

                <form id='user-create' onSubmit={e => {
                    e.preventDefault()
                }}>
                    <div className="login-form-wrapper">
                        <label className="login-form-label" htmlFor="orgname">ORGANIZATION NAME</label>
                        <input ref={register} id="orgname" name="orgname" className="login-form" />
                    </div>
                    <div className="login-form-wrapper">
                        <label className="login-form-label" htmlFor="orgweb">ORGANIZATION WEBSITE</label>
                        <input ref={register} id="orgweb" name="orgweb" className="login-form" />
                    </div>

                </form>
            </div>

        </>
    )
}



