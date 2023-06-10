import React, {useState, useEffect} from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarController, BarElement } from 'chart.js';
import { getSentiment } from './api'
import { Categories } from './models';

interface SentimentResonatorProps {
    entry: Categories
    goals: Categories
}

interface SentimentResponse {
    data: Categories
}

export function SentimentResonator({entry, goals}: SentimentResonatorProps) {
    const [sentiment, setSentiment] = useState(undefined as Categories | undefined)

    useEffect(() => {
        const fetchSentiment = async () => {
          const response: SentimentResponse = await getSentiment(entry, goals);
          setSentiment(response.data || undefined)
        };
      
        fetchSentiment();
      }, []);

    Chart.register(LinearScale, CategoryScale, BarController, BarElement);
    const data = {
        labels: ['Work', 'Workout', 'Fun', 'Food', 'Finance'],
        datasets: [
            {
            label: 'Sentiment Score',
            data: sentiment ? [sentiment.work, sentiment.workout, sentiment.fun, sentiment.food, sentiment.finance] : [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1,
            },
        ],
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Closeness To Goal',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Category',
                },
            },
        },
    };
    
    return (
        <>
            <h5>Sentiment:</h5>
            {sentiment ? <Bar data={data} options={options} /> : <div>Loading...</div>}
        </>
    );      
}
