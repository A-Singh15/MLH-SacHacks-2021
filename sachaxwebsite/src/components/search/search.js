import './search.scss'

import Dropdown, { SearchArea } from './dropdown'
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from 'react'
import React from 'react'
import { GoogleMap, useJsApiLoader, LoadScript, Marker } from '@react-google-maps/api';
import {
    useRecoilState, useRecoilValue
} from 'recoil'
import { atom_SearchParams } from '../../utils/atoms'

import covidpng from './covidcard.png'
import { useHistory } from 'react-router-dom'

import { heartSVG } from '../../assets/assets'

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
                            <motion.div
                                animate={{ y: '10px' }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 1
                                }}
                                className='big-heart'>
                                {heartSVG}
                            </motion.div>
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
                        className='search-content'
                    >

                        <div className='search-area-wrapper'>
                            <SearchArea />
                        </div>
                        <SearchResults />

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

}


/**
 * 
 * ANCHOR SEARCH RESULTS
 */

function SearchResults() {

    const searchParams = useRecoilValue(atom_SearchParams)

    //if doesnt need map from params
    //show only cards

    return (
        <div className='search-results-wrapper'

        >
            <div className='search-results-cards'
                style={{
                    width: searchParams.searchType == 'OnlineEvent' ? '100%' : '50%'
                }}
            >
                {resultData.map(item => (
                    <SearchResultCard data={item} />
                ))}
            </div>
            {searchParams.searchType !== 'OnlineEvent' && (
                <SearchMap />
            )}

        </div>
    )
}

/**
 * ANCHOR SEARCHCARDRESULT FAKE DATA
 * 
 */

const resultData = [
    {
        tags: ['#freecovidtest', '#freefood', 'freemasks', '#rapidcovidtest',],
        title: 'COVID-19 Relief: Free Testing & Masks',
        address: '635 Anderson Rd, Davis, CA',
        body: 'lorem ipsum!!!!Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, sed do...',
        to: '/event/test'
    },
    {
        tags: ['#freecovidtest', '#freefood', 'freemasks', '#rapidcovidtest',],
        title: 'COVID-19 Relief: Free Testing & Masks',
        address: '635 Anderson Rd, Davis, CA',
        body: 'lorem ipsum!!!!Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, sed do...',
        to: '/event/test'
    },
    {
        tags: ['#freecovidtest', '#freefood', 'freemasks', '#rapidcovidtest',],
        title: 'COVID-19 Relief: Free Testing & Masks',
        address: '635 Anderson Rd, Davis, CA',
        body: 'lorem ipsum!!!!Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, sed do...',
        to: '/event/test'
    },
    {
        tags: ['#freecovidtest', '#freefood', 'freemasks', '#rapidcovidtest',],
        title: 'COVID-19 Relief: Free Testing & Masks',
        address: '635 Anderson Rd, Davis, CA',
        body: 'lorem ipsum!!!!Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, sed do...',
        to: '/event/test'
    },
    {
        tags: ['#freecovidtest', '#freefood', 'freemasks', '#rapidcovidtest',],
        title: 'COVID-19 Relief: Free Testing & Masks',
        address: '635 Anderson Rd, Davis, CA',
        body: 'lorem ipsum!!!!Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, sed do...',
        to: '/event/test'
    },
    {
        tags: ['#freecovidtest', '#freefood', 'freemasks', '#rapidcovidtest',],
        title: 'COVID-19 Relief: Free Testing & Masks',
        address: '635 Anderson Rd, Davis, CA',
        body: 'lorem ipsum!!!!Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, sed do...',
        to: '/event/test'
    }
]

/** 
 * ANCHOR SEARCH RESULT CARD
*/

function SearchResultCard(props) {
    let data = props.data
    const cardTags = ['#freecovidtest', '#freefood', 'freemasks', '#rapidcovidtest',]
    let history = useHistory()

    return (
        <div className='card-wrapper'
            onClick={e => {
                history.push(data.to)
            }}
        >

            <img className='card-image'
                src={covidpng}
            />
            <div className='card-desc'>
                <div className='card-tags'>
                    {cardTags.map(item => (
                        <span className='card-tag' key={item}>
                            {item}
                        </span>
                    ))}
                </div>
                <div className='card-title'>
                    {data.title}
                </div>
                <div className='card-address'>
                    {data.address}
                </div>
                <div className='card-body'>
                    {data.body}
                </div>
            </div>
            <div className='card-background'>
            </div>
        </div>
    )

}



function SearchMap() {

    const searchParams = useRecoilValue(atom_SearchParams)

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };
    const center = {
        lat: 33.8231296,
        lng: -118.289203
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCumPp-MUvheo1S7ixUDqVoz-13ypCnjE4'
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        map.setZoom(10)
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    return isLoaded ? (
        <div className='search-results-map'>

            <GoogleMap
                mapContainerStyle={mapStyles}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </div>
    ) : <></>

}

