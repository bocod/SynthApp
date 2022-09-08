import React from 'react';
import FetchNews from '../../../api/news';
import "./Marquee.css";

export default function Marquee () {

    return (
        <div className="mq-wrap">
            <div className="marquee">
                <div className="track bg-danger bg-gradient">
                    <FetchNews/>
                </div>
            </div>
        </div>
    )
}