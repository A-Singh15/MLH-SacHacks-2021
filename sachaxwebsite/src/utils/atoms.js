import {
    atom,
} from 'recoil';



const atom_id = atom({
    key: 'atomkey', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});