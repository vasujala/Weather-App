import React, { useState, useEffect } from 'react';
import './App.css';
import './styles.css';




 import{
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: ' 5 day / 3 hour weather forecast data',
    },
  },
};

const authToken = '2216c81c2407b49465fdb3ba565a0a52';

export default function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState();
  const [error, setError] = useState('');

  const labels = [0, 8, 16, 24, 32].map(
    (k) => weather?.list[k].dt_txt.split(' ')[0]
    
  );
  const data = {
    labels,
    datasets: [
      {
        label: '3:00',
        data: labels.map(
          (_, i) => (weather?.list[0 + i * 8].main.temp ?? 273) - 273
        ),
        backgroundColor: '#F3A505',
      },
      {
        label: '6:00',
        data: labels.map(
          (_, i) => (weather?.list[1 + i * 8].main.temp ?? 273) - 273
        ),
        backgroundColor: '#B5B8B1',
      },
      {
        label: '9:00',
        data: labels.map(
          (_, i) => (weather?.list[2 + i * 8].main.temp ?? 273) - 273
        ),
        backgroundColor: '#755C48',
      },
      {
        label: '15:00',
        data: labels.map(
          (_, i) => (weather?.list[4 + i * 8].main.temp ?? 273) - 273
        ),
        backgroundColor: '#ED760E',
      },
      {
        label: '18:00',
        data: labels.map(
          (_, i) => (weather?.list[5 + i * 8].main.temp ?? 273) - 273
        ),
        backgroundColor: '#7FB5B5',
      },
      {
        label: '21:00',
        data: labels.map(
          (_, i) => (weather?.list[6 + i * 8].main.temp ?? 273) - 273
        ),
        backgroundColor: '#1E1E1E',
      },
      {
        label: '24:00',
        data: labels.map(
          (_, i) => (weather?.list[7 + i * 8].main.temp ?? 273) - 273
        ),
        backgroundColor: '#8F8F8F',
      },
    ],
  };
  const fetchWeatherData = async () => {
    setWeather(undefined);
    setError('');
    try {
      const res = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${authToken}"
      );
      const json = await res.json();
      setWeather(json);
    } catch (e) {
      setError('Network Error');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder={'Search City'}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => fetchWeatherData()}>Get Weather Data</button>
      <br />
      {weather?.city.name} ({weather?.city.country}) <br />
      {error}
      <Bar options={options} data={data} />
      // Before accessing index 0

    console.log(myArray);
// Your code accessing index 0 
    </div>
  );
}

