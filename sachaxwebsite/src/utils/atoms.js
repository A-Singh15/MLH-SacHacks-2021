import {
    atom,
} from 'recoil';



const atom_id = atom({
    key: 'atomkey', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export const atom_SearchParams = atom({
    key: 'atom_SearchType', // unique ID (with respect to other atoms/selectors)
    default: {
        searchType: 'not selected',
        location: 'not selected'
    }, // default value (aka initial value)
});

export const atom_AboutHover = atom({
    key: 'atom_AboutHover',
    default: ''
})


export const atom_Loading = atom({
    key: 'atom_Loading',
    default: true
})

//accouint stuff

export const currentModeAtom = atom({
    key: 'currentMode',
    default: 'signin',
});
export const userLoggedInAtom = atom({
    key: 'userLoggedIn',
    default: false,
});

export const userUIDFromFirebaseAtom = atom({
    key: 'userUIDFromFirebase',
    default: null
})

export const userLoginValuesAtom = atom({
    key: 'userLoginValues',
    default: {
        email: '',
        password: ''
    }
})

export const userCreateValuesAtom = atom({
    key: 'userCreateValues',
    default: {
        username: "",
        photoURL: "",
    }
})
export const userData_username = atom({
    key: 'userData_username',
    default: "undefined"
})

export const userCreateEventValuesAtom = atom({
    key: 'userCreateEventValues',
    default: {
        username: "",
        photoURL: "",
    }
})