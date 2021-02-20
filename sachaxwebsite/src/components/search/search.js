import './search.scss'

import Dropdown, { SearchArea } from './dropdown'
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from 'react'

import {
    useRecoilState, useRecoilValue
} from 'recoil'
import { atom_SearchParams } from '../../utils/atoms'

import covidpng from './covidcard.png'

const fadeInUp = {
    initial: {
        opacity: 0,
        y: '-4vw',
        scale: 0.8
    },
    animate: {
        opacity: 1,
        y: '0vw',
        scale: 1
    }
}

const bigQ = {
    initial: {
        opacity: 0,
        y: '-16vw',
        x: calcvw(-753 / 2),
        scale: 0.8,
    },
    animate: {
        opacity: 1,
        y: '-12vw',
        x: calcvw(-753 / 2),
        scale: 1
    }
}

function calcvw(px) {
    return px / 19.2 + 'vw'
}

export default function Search() {

    const [isVisible, setVisible] = useState(false);
    const searchParams = useRecoilValue(atom_SearchParams)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (!searchParams.searchType) {
            return
        }
        setLoading(false)
        if (
            searchParams.searchType !== "not selected" &&
            searchParams.location !== "not selected"
        ) {
            if (!isVisible) {
                setVisible(!isVisible)
            }
        }
    })
    if (loading) {
        return (
            <div>
                loading
            </div>
        )
    }
    return (
        <div className='search-page'>
            <AnimatePresence>
                {!isVisible && (
                    <>

                        <motion.div
                            initial={bigQ.initial}
                            animate={bigQ.animate}
                            exit={bigQ.initial}
                            key='bigQ'
                            className='bigQ'
                        >
                            What are you looking for?
                        </motion.div>
                        <Dropdown />
                    </>
                )}
                {isVisible && (
                    <motion.div
                        initial={fadeInUp.initial}
                        animate={fadeInUp.animate}
                        key='content'
                    >
                        <div className='search-content'>
                            <SearchArea />
                            <SearchResults />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

}



function SearchResults() {

    const searchParams = useRecoilValue(atom_SearchParams)

    //if doesnt need map from params
    //show only cards

    return (
        <div className='search-results-wrapper'>
            <div className='search-results-cards'
                style={{
                    width: searchParams.searchType == 'OnlineEvent' ? '100%' : '50%'
                }}
            >
                <SearchResultCard />
            </div>
            {searchParams.searchType !== 'OnlineEvent' && (
                <div className='search-results-map'>
                    map here
                </div>
            )}

        </div>
    )
}

function SearchResultCard() {

    const cardTags = ['#freecovidtest', '#freefood', 'freemasks', '#rapidcovidtest',]

    return (
        <div className='card-wrapper'>
            <div className='card-background'>
            </div>
            <div className='card-image'>

            </div>
            <div className='card-desc'>
                <div className='card-tags'>
                    {cardTags.map(item => (
                        <span className='card-tag' key={item}>
                            {item}
                        </span>
                    ))}
                </div>
                <div className='card-title'>
                    COVID-19 Relief: Free Testing & Masks
                </div>
                <div className='card-address'>
                    635 Anderson Rd, Davis, CA
                </div>
                <div className='card-body'>
                    lorem ipsum!!!!Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, sed do...
                </div>
            </div>
        </div>
    )

}