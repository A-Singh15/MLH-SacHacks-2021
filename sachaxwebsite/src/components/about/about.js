import './about.scss'
import { Aboutsvg } from './profile_illust'

import { useState } from 'react'
import foreach from 'lodash.foreach'

export default function About() {
    const [brandon, setBrandon] = useState(false)
    const [mai, setMai] = useState(false)
    const [sally, setSally] = useState(false)
    const [ppoppi, setPpoppi] = useState(false)

    const people = {
        brandon: [brandon, setBrandon, {
            name: 'Brandon Choi (he/him/his)',
            desc: 'Brandon is a third year student majoring in Mathematics at UC Riverside. He worked on fullstack and little bit of devops using React, Express, and Nginx on Digital Ocean.'
        }],
        mai: [mai, setMai, {
            name: 'Mai Moua Vang (she/her/hers)',
            desc: 'Mai Moua is a UX designer and UC Davis alumna. For this project, she worked on literature review, personas, competitive analysis, information architecture, user flows, and lo-fi wireframes. You can find more of her work on her portfolio.'
        }],
        sally: [sally, setSally, {
            name: 'Sally Kim (she/her/hers)',
            desc: 'Sally is a third year student majoring in Design at UC Davis. For this project, she worked on all visuals and aesthetics, including brand identity,  vector illustrations, and the User Interface (UI) design. See more of her work on her instagram or her portfolio!'
        }],
        ppoppi: [ppoppi, setPpoppi, {
            name: 'PPoPPi (undisclosed)',
            desc: 'cute dog'
        }],
    }

    function handleHover(e) {
        if (!people[e.target.id][0]) {
            people[e.target.id][1](true)
            console.log(e.target.id)
        }
    }

    const infoArr = []
    foreach(people, item => (
        infoArr.push(<InfoCard active={item[0]} key={item[2].name + 1} data={item[2]} />)
    ))

    return (
        <div className='about-page'>

            {infoArr}
            <div className='about-svg'>
                <Aboutsvg handleHover={handleHover} />
            </div>
            <div className='about-background'>

            </div>

        </div>
    )
}




function InfoCard(props) {

    return (
        <div className={'info-card ' + props.data.name +
            (props.active ? ' active ' : ' notactive ')
        }>
            <div className='info-card-name'>
                {props.data.name}
            </div>
            <div className='info-card-desc'>
                {props.data.desc}
            </div>
        </div>
    )
}