import { motion } from 'framer-motion'
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import './search.scss'

import {
    useSetRecoilState
} from 'recoil'
import { atom_SearchParams } from '../../utils/atoms'
import { useHistory } from 'react-router-dom';

function calcvw(px) {
    return px / 19.2 + 'vw'
}

const fadeInUp = {
    initial: {
        opacity: 0,
        y: '-8vw',
        x: '-30vw',
        top: '50%',
        left: '50%',
        width: '60vw',
        height: '5vw',
        fontSize: calcvw(24)
    },
    jumbo: {
        opacity: 1,
        y: '-2.5vw',
        x: '-30vw',
        top: '50%',
        left: '50%',
        width: '60vw',
        height: '5vw',
        fontSize: calcvw(24)
    }
}

export default function Dropdown() {
    const { register, handleSubmit, watch } = useForm();
    const onSubmit = data => console.log(data);
    const setSearchParams = useSetRecoilState(atom_SearchParams)

    //const [searchType, setSearchType] = useRecoilState(atom_SearchType)
    const watchAllFields = watch();

    let history = useHistory();


    useEffect(() => {
        if (!watchAllFields.searchType) {
            return
        }
        if (
            watchAllFields.searchType !== "not selected" &&
            watchAllFields.location !== "not selected"
        ) {
            console.log('both selected')
            setSearchParams(watchAllFields)
            history.push('/search/' + watchAllFields.searchType + '/' + watchAllFields.location)
        }
    }, [watchAllFields])
    console.log(watchAllFields)

    return (
        <motion.div
            key={'dropdown'}
            initial={fadeInUp.initial}
            animate={fadeInUp.jumbo}
            exit={fadeInUp.initial}
            transition={{ duration: 0.3 }}
            className='motion-search'
        >

            <form className='search-form' onSubmit={handleSubmit(onSubmit)}>
                <span className='search-form-text'>
                    Show me some...
                </span>
                <select
                    defaultValue='not selected'
                    className='search-dropdown'
                    name="searchType" ref={register}>
                    <option value="not selected" disabled>Choose a Type</option>
                    <option value="OnlineEvent"> Online Event  </option>
                    <option value="Resources">   Resources </option>
                    <option value="Services">  Services </option>
                </select>
                <div className='search-form-text'>
                    around
                </div>
                <select
                    defaultValue='not selected'
                    className='search-dropdown'
                    name="location" ref={register}>
                    <option value="not selected" disabled>Choose a Location</option>
                    <option value="Sacramento">Sacramento, CA</option>
                    <option value="Torrance">Torrance, CA</option>
                    <option value="Antartica">Antartica</option>
                </select>
            </form>
        </motion.div>
    )

}