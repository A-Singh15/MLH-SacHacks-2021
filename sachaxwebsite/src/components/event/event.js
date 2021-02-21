import './event.scss'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

import testpng from './testevent.png';
import testwebpng from './testweb.png'

import { pointer, link, copy } from './eventassets'

export default function Event() {

    let { eventID } = useParams();
    //fetch event page
    if (eventData[eventID]) {
        const data = eventData[eventID];
        return (
            <div className='event-page'>
                <div className='event-header'>
                    <div className='event-date'>
                        {data.date}
                    </div>
                    <div className='event-title'>
                        {data.title}
                    </div>
                    <div className='event-host'>
                        HOSTED BY: {data.host}
                    </div>
                </div>
                <div className='event-page-content'>
                    <div className='event-intro'>
                        <div className='desc-wrapper'>
                            <img className='event-img' src={testpng} />
                            <div className='event-desc-wrapper'>
                                <div className='desc-tags'>
                                    {data.tags.map(item => (
                                        <DescTag>{item}</DescTag>
                                    ))}
                                </div>
                                <div className='desc-title'>
                                    DESCRIPTION
                                </div>
                                <div className='desc-body'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat id porta nibh venenatis cras. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Donec adipiscing tristique risus nec. Leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Tincidunt vitae semper quis lectus nulla. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi.
                                </div>
                            </div>
                        </div>
                        <div className='links-wrapper'>
                            <div className='links-website' >
                                <div className='image-wrapper'>
                                    <img src={testwebpng} />
                                </div>
                                <div className='website-info'>
                                    <div className='website-title'>
                                        NEXT CHAPTER BOOK CLUB
                                    </div>
                                    <a className='website-link'
                                        href="https://google.com">
                                        visit website
                                    </a>
                                </div>
                            </div>
                            <div className='links-extras'>
                                <div className='online'>
                                    {pointer} ONLINE EVENT
                                </div>
                                <div className='copy'>
                                    {copy}  COPY LINK
                                </div>
                                <div className='join'>
                                    {link} JOIN MEETING
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='err-404'>
            page not found
        </div>
    )


}



function DescTag(props) {
    return (
        <div className='desc-tag'>
            {props.children}
        </div>
    )
}


const eventData = {
    test: {
        date: 'TUESDAY, Feb 23, 4:00 PM PST',
        title: 'Navigating Mental Health as a Student during COVID-19',
        host: 'NEXT CHAPTER BOOK CLUB',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat id porta nibh venenatis cras. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Donec adipiscing tristique risus nec. Leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Tincidunt vitae semper quis lectus nulla. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi.',
        tags: ['#tutoring', '#mentalhealth', '#jobs', '#freshvegetables', '#scholarships']
    }
}