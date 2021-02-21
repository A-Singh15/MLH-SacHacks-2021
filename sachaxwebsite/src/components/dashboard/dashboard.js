import {
    useSetRecoilState,
    useRecoilValue
} from 'recoil';
import { useForm } from "react-hook-form";

import {
    userCreateEventValuesAtom
} from '../../utils/atoms'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './dashboard.scss'

import covidpng from '../search/covidcard.png'

export default function Dashboard() {

    const setUserValues = useSetRecoilState(userCreateEventValuesAtom)

    const { register, watch } = useForm();
    const watchAllFields = watch(undefined, {
        username: "",

    });
    const watchPic = watch('profilePicture');
    let history = useHistory()

    useEffect(() => {
        console.log(watchAllFields)
        setUserValues(watchAllFields)
    }, [setUserValues, watchAllFields])


    const [mode, setMode] = useState(true)


    return (
        <div className='dashboard-page'>
            <div className='dashboard-header'>

                <div className='dashboard-title'>
                    {mode ? 'Post a New Event!' : 'Confirm Event Details'}
                </div>

            </div>
            <div className='dashboard-page-content'>
                <form id='event-create'
                    style={{
                        opacity: mode ? '1' : '0',
                        display: mode ? '' : 'none',
                    }}
                    onSubmit={e => {
                        e.preventDefault()
                    }}>
                    <div className="event-form-wrapper">
                        <label className="event-form-label" htmlFor="event-title">Event Title</label>
                        <input ref={register} id="event-title" name="event-title" className="event-form" />
                    </div>
                    <div className="event-form-wrapper">
                        <label className="event-form-label" htmlFor="event-desc">Event Description</label>
                        <textarea ref={register} id="event-desc" name="event-desc" className="event-form" />
                    </div>
                    <TagWrapper />
                    <div className="event-form-wrapper">
                        <label className="event-form-label" htmlFor="email">Event Title</label>
                    </div>
                    <div className='event-image'>
                        <div>
                            Main Event image
                            <span>
                                this is the image people see on the public event card
                            </span>

                        </div>
                        <div className='event-image-click'>
                            CLICK TO ADD IMAGE
                        </div>
                    </div>

                    <div className='event-location'>
                        <div>
                            Location
                        <span>
                                Help people in your city discover your events and let partipants know where to show up.                            </span>

                        </div>
                        <div className='event-location-input'>

                            <select
                                defaultValue={'not selected'}
                                className='search-dropdown small dashboard'
                                name="searchType" ref={register}>
                                <option value="not selected" disabled>TYPE OF EVENT</option>
                                <option value="OnlineEvent"> Online Event  </option>
                                <option value="Resources">   Resources </option>
                                <option value="Services">  Services </option>
                            </select>
                            <input placeholder='Event URL-LINK or ADDRESS' ref={register} id="event-address" name="event-address" className="event-form" />

                        </div>
                    </div>
                    <div className='event-image date'>
                        <div>
                            Date & Time
                            <span>
                                Let people know when your event starts and ends.                            </span>

                        </div>
                        <div className='date-input-wrapper'>
                            <input placeholder='START DATE AND TIME' ref={register} id="startdate" name="startdate" className="event-form date" />
                            <input placeholder='END DATE AND TIME' ref={register} id="enddate" name="enddate" className="event-form date" />

                        </div>
                    </div>
                    <div className='end-buttons'>
                        <Tag
                            onClick={e => {
                                history.push('/')
                            }}
                        >
                            DISCARD
                        </Tag>
                        <Tag
                            onClick={e => {
                                setMode(false)
                            }}
                        >
                            SAVE & CONTINUE
                        </Tag>
                    </div>
                </form>

                <div id='event-confirm'
                    style={{
                        opacity: !mode ? '1' : '0',
                        display: !mode ? '' : 'none',
                    }}
                >
                    <div className='event-confirm-inner'>
                        <div className='event-confirm-card-wrapper'>
                            <SearchResultCard data={{
                                tags: ['#freecovidtest', '#freefood', 'freemasks', '#rapidcovidtest',],
                                title: 'COVID-19 Relief: Free Testing & Masks',
                                address: '635 Anderson Rd, Davis, CA',
                                body: 'lorem ipsum!!!!Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, sed do...',
                                to: '/event/test'
                            }} />
                        </div>
                        <div className='event-confirm-message'>
                            <div>
                                Almost there!
                            </div>

                            This is how your event will look like on the dashboard. Double-check your event details before it’s published live to your community!
                            <br /><br />
                            When you’re ready, click ‘PUBLISH’ to post.
                        </div>
                    </div>
                    <div className='confirm-buttons'>
                        <Tag
                            onClick={e => {
                                setMode(true)
                            }}
                        >
                            EDIT
                        </Tag>
                        <Tag
                            onClick={e => {
                                history.push('/')
                            }}
                        >
                            PUBLISH
                        </Tag>
                    </div>
                </div>
            </div>
        </div>
    )

}





function TagWrapper() {

    //need to fetch tags in type and area
    //for now use fake tags
    const tags = ['#freecovidtest', '#freefood', '#freemasks', '#rapidcovidtest', '#smallbusiness', '#foodassistance', '#evictionprotection', '#mortgagerelief', '#unemployment', '#careercounseling', '#healthcare', '#pantrydrive', '#tutoring', '#mentalhealth', '#jobs', '#freshvegetables', '#scholarships', '#today', '#covidupdate', '#spanish', '#korean', '#hmong', '#education', "#forbearance", "#studentloans"]
    return (
        <div className='tag-wrapper dashboard'>
            {tags.map((item, index) => (
                <Tag
                    onClick={e => {
                        e.target.classList.toggle('selected')
                    }}
                    key={item}>
                    {item}
                </Tag>
            ))}
        </div>
    )
}

function Tag(props) {



    return (
        <div
            {...props}

            className={props.className ? props.className : 'tag-item dashboard'}
        >
            {props.children}
        </div>
    )
}

function SearchResultCard(props) {
    let data = props.data
    const cardTags = ['#freecovidtest', '#freefood', 'freemasks', '#rapidcovidtest',]
    let history = useHistory()

    return (
        <div className='card-wrapper'
            onClick={e => {
                //history.push(data.to)
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