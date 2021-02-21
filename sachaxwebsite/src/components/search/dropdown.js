import { motion } from 'framer-motion'
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import './search.scss'

import {
    useRecoilState,
    useSetRecoilState
} from 'recoil'
import { atom_SearchParams } from '../../utils/atoms'
import { useHistory } from 'react-router-dom';

import isEqual from 'lodash.isequal'

function calcvw(px) {
    return px / 19.2 + 'vw'
}

/**
 * ANCHOR FRAMER SETTINGS
 */

const fadeInUp = {
    initial: {
        opacity: 0,
        y: '-8vw',
        x: '-30vw',
        top: '50%',
        left: '50%',
        width: '60vw',
        height: '5vw',
        fontSize: calcvw(36)
    },
    jumbo: {
        opacity: 1,
        y: '-2.5vw',
        x: '-30vw',
        top: '57%',
        left: '50%',
        width: '60vw',
        height: calcvw(48),
        fontSize: calcvw(36)
    }
}

/**
 * 
 *ANCHOR DROPDOWN
 */



export default function Dropdown(props) {
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
            if (props) {
                if (props.small !== undefined) {
                    if (!props.small) {

                    }
                } else {
                    console.log('both selected')
                    console.log(props)
                    setSearchParams(watchAllFields)
                }
            }

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
                    defaultValue={'not selected'}
                    className='search-dropdown small'
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
                    defaultValue={'not selected'}
                    className='search-dropdown small'
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

const fadeInDown = {
    before: {
        opacity: 0,
        y: calcvw(180),
        x: calcvw(90),
        top: '0',
        left: '0',
        width: '60vw',
        height: '5vw',
        fontSize: calcvw(36),
        backgroundSize: '3vw',
    },
    after: {
        opacity: 1,
        y: calcvw(180),
        x: calcvw(90),
        top: '0',
        left: '0',
        width: calcvw(1200),
        height: calcvw(48),
        fontSize: calcvw(36),
        backgroundSize: '2vw',
    }
}

export function SearchArea() {
    const { register, handleSubmit, watch } = useForm();
    const onSubmit = data => console.log(data);
    //get previous values for thing
    const [searchParams, setSearchParams] = useRecoilState(atom_SearchParams)
    const watchAllFields = watch();

    var prevFields = searchParams;
    useEffect(() => {
        if (!watchAllFields) {
            return
        }
        if (!isEqual(prevFields, watchAllFields)) {
            setSearchParams(watchAllFields)
        }

    }, [watchAllFields])
    return (
        <motion.div
            key={'dropdown'}
            initial={fadeInDown.before}
            animate={fadeInDown.after}
            exit={fadeInUp.before}
            transition={{ duration: 0.5 }}
            className='motion-search'
        >
            <>
                <form className='search-form' onSubmit={handleSubmit(onSubmit)}>
                    <span className='search-form-text'>
                        Show me some...
                </span>
                    <select
                        defaultValue={searchParams.searchType}
                        className='search-dropdown small'
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
                        defaultValue={searchParams.location}
                        className='search-dropdown small'
                        name="location" ref={register}>
                        <option value="not selected" disabled>Choose a Location</option>
                        <option value="Sacramento">Sacramento, CA</option>
                        <option value="Torrance">Torrance, CA</option>
                        <option value="Antartica">Antartica</option>
                    </select>
                </form>
                <TagWrapper />
            </>
        </motion.div>
    )
}

function TagWrapper() {

    //need to fetch tags in type and area
    //for now use fake tags
    const tags = ['#freecovidtest', '#freefood', '#freemasks', '#rapidcovidtest', '#smallbusiness', '#foodassistance', '#evictionprotection', '#mortgagerelief', '#unemployment', '#careercounseling', '#healthcare', '#pantrydrive', '#tutoring', '#mentalhealth', '#jobs', '#freshvegetables', '#scholarships', '#today', '#covidupdate', '#spanish', '#korean', '#hmong', '#education', "#forbearance", "#studentloans"]
    return (
        <div className='tag-wrapper'>
            {tags.map((item, index) => (
                <Tag key={item}>
                    {item}
                </Tag>
            ))}
        </div>
    )
}

function Tag(props) {
    return (
        <div className='tag-item'
            onClick={e => {
                e.target.classList.toggle('selected')
            }}
        >
            {props.children}
        </div>
    )
}