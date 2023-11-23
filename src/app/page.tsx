'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const apiKey = '8942267c8f942eaf34df4b4c0732bff6';

    const getWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            );

            setWeather(response.data);
            setError(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                setError(axiosError.message);
            } else {
                setError('Erro ao obter o clima');
            }
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-black text-white'>
            <div className='border-2 border-white/20 bg-black/10 p-10 rounded-md shadow-md'>
                <h1 className='text-3xl font-bold mb-4'>Verificar Clima</h1>
                <div className='flex items-center space-x-4'>
                    <input
                        type='text'
                        placeholder='Digite uma cidade'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className='p-2 rounded bg-gray-800 focus:outline-none text-white'
                    />
                    <button onClick={getWeather} className='px-4 py-2 bg-blue-500 text-white rounded'>Obter clima</button>
                </div>
                {error && <p className='text-red-500 mt-2'>{error}</p>}
                {weather && (
                    <div className='mt-4'>
                        <div className='grid grid-cols-2 gap-4 mt-4'>
                            <div>
                                <p className='text-gray-500'>Temperatura</p>
                                <p className='text-3xl'>{weather.main.temp} F </p>
                            </div>
                            <div>
                                <p className='text-gray-500'>Status</p>
                                <p className='text-2xl capitalize'>{weather.weather[0].description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;