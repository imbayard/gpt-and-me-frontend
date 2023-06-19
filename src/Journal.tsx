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
    const [form, setForm] = useState(emptyForm)
    const [gptResponse, setGptResponse] = useState(emptyForm)
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
        </div>
    )
}