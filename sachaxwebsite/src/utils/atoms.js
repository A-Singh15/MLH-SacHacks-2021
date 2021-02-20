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