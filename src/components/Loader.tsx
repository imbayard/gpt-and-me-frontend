import React from 'react'
import './Loader.css'

export default function Loader({message}: {message: string}) {
    return (
        <div className='loader-wrap'>
            <div className="loader"></div>
            <p>{message}</p>
        </div>
    )
}