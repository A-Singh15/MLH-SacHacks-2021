import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import './home.scss'

import { logo } from '../../assets/assets'
import { useHistory } from 'react-router-dom'
import { atom_Loading } from '../../utils/atoms'
import { useRecoilState } from 'recoil'

const fadeDown = {
    before: {
        y: '-100px',
        opacity: 0
    },
    after: {
        y: 0,
        opacity: 1
    }
}


export default function Home() {

    const [loading, setLoading] = useRecoilState(atom_Loading)

    const loadingdur = 2

    if (loading) {
        setTimeout(() => {
            setLoading(false)
        }, loadingdur * 1000)
    }


    return (
        <>
            <AnimatePresence>
                {loading ? (
                    <>
                        <motion.div
                            initial={fadeDown.before}
                            animate={fadeDown.after}
                            exit={fadeDown.before}
                            key='asddas'
                            className='home-loading'
                        >
                            <div className='loading-logo'>
                                {logo}
                            </div>
                            <div className='loading-bar-wrapper'>
                                <motion.div
                                    animate={{ width: '100%' }}
                                    transition={{ ease: "easeOut", duration: 2 }}
                                    className='loading-bar'
                                >

                                </motion.div>
                            </div>
                            <div>
                                loading...
                            </div>

                        </motion.div>
                        <motion.div
                            initial={fadeDown.after}
                            animate={fadeDown.after}
                            exit={fadeDown.before}
                            className='backdrop' />
                    </>
                ) : (
                        <motion.div
                            initial={fadeDown.before}
                            animate={fadeDown.after}
                            exit={fadeDown.before}
                            key='bdas12'

                        >
                            <Banner />
                        </motion.div>
                    )}
            </AnimatePresence>

        </>
    )

}

function Banner() {

    let history = useHistory()

    return (
        <div className='banner-wrapper'>
            <div className='title'>
                We’re here for you.
            </div>
            <div className='body'>
                auxilium’s got your back, whether it may be for finding free masks, free COVID-19 testing locations, or simply finding a one-day cooking class.
            </div>
            <div className='getstarted'
                onClick={e => {
                    history.push('/search')
                }}
            >
                GET STARTED
            </div>
        </div>
    )
}