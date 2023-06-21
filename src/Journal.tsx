import React, { useState } from 'react'
import { postPost } from './api'

import './Journal.css'
import { CATEGORIES } from './lib/constants'
import { Categories } from './models'
import Loader from './components/Loader'

export default function Journal() {

    const emptyForm: Categories = {
        work: '',
        workout: '',
        sanity: '',
        food: '',
        finance: ''
    }
    const sampleRes: Categories = {
        work: 'You had a great day today!',
        workout: 'It seems like youre falling off your 2x per day. Time to get back on!',
        sanity: 'You need to take some more time for yourself, but Im glad you have hobbies.',
        food: 'Eating healthy today is a great start to eating healthy again tomorrow!',
        finance: 'You restrained yourself from spending too much, well done.',
        summary: 'A great day overall! You should be proud of yourself :)'
    }
    const [form, setForm] = useState(emptyForm)
    const [gptResponse, setGptResponse] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: any) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setIsLoading(true);
        const response = await postPost(form)
        setIsLoading(false);
        console.log(response.data)
        setGptResponse(response.data)
        return
    };

    return (
        <div className="journal-container">
            <h2>What's your day looking like</h2>
            <form className="journal-form">
                {Object.keys(CATEGORIES).map((key: string) => {
                    const category = CATEGORIES[(key as keyof Categories)]
                    const value = form[key as keyof Categories]
                    return(
                        <label key={key}>
                            <p>{category}</p>
                            <input 
                                onChange={(e) => handleChange(e)} 
                                type="text" 
                                name={key} 
                                placeholder={category}
                                value={value || ''}
                            />
                        </label>
                )})}
                {isLoading ? (
                    <Loader message={'Getting Feedback...'}/>
                ) : (
                    <button onClick={(e) => handleSubmit(e)} type="submit">Submit</button>
                )}
            </form>
            {(gptResponse && gptResponse !== emptyForm) ? (
                <div className='gpt-response'>
                    <h3>Response</h3>
                    {Object.keys(gptResponse).map(key => {
                        const value = gptResponse[(key as keyof Categories)]
                        const label = `${key.charAt(0).toLocaleUpperCase()}${key.slice(1)}`
                        return (
                            <div className='gpt-response-row' key={key}>
                                <p className='gpt-response-label'>{label}</p>
                                <p className='gpt-response-value'>{value}</p>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}