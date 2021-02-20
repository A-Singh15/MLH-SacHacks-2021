import './search.scss'

import Dropdown from './dropdown'
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from 'react'

import {
    useRecoilState, useRecoilValue
} from 'recoil'
import { atom_SearchParams } from '../../utils/atoms'

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

    useEffect(() => {
        if (!searchParams.searchType) {
            return
        }
        if (
            searchParams.searchType !== "not selected" &&
            searchParams.location !== "not selected"
        ) {
            if (!isVisible) {
                setVisible(!isVisible)
            }
        }
    })

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
                        <div>
                            hello
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

}


function Tags() {


    return (
        <div>
            covid
        </div>
    )

}