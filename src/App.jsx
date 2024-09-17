import { useState } from 'react'
import './App.css'

function App() {
  const [date, setDate] = useState('')
  const [minTemp, setMinTemp] = useState('')
  const [temperature, setTemperature] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleMinTempChange = (event) => {
    setMinTemp(event.target.value)
  }

  const handleDateChange = (event) => {
    setDate(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const minTempFloat = parseFloat(minTemp)

      if (isNaN(minTempFloat)) {
        throw new Error('Invalid temperature input')
      }

      if (!date) {
        throw new Error('Invalid data input')
      }

      const [year, month, day] = date.split('-')

      const csvData = `${minTempFloat},${year},${month},${day}`

      const response = await fetch('http://localhost:3001/predict-temperature', {
        method: 'POST',
        body: csvData,
        headers: {
          'Content-Type': 'text/csv',
        },
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status ${response.status}`)
      }

      const responseBody = await response.json()
      setTemperature({ maxTemp: responseBody.maxTemp })

    }
    catch (error) {
      console.error('Error fetching temperature:', error)
      setTemperature(null)
    }
    setLoading(false)
  }

  return (
    <div className='weather-container'>
      <form onSubmit={handleSubmit} className='weather-form'>
        <input
          type='text'
          value={date}
          onChange={handleDateChange}
          placeholder='Enter date (e.g., 2027-01-25)'
          className='weather-input'
        />
        <input
          type='number'
          value={minTemp}
          onChange={handleMinTempChange}
          placeholder='Enter min temperature (F)'
          className='weather-input'
        />
        <button
          type='submit'
          className='weather-submit'
          disabled={loading}>
          {loading ? 'Loading...' : 'Get Temperature'}
        </button>
      </form>
      {temperature && (
        <div className='weather-response-card'>
          <p>Max Temperature: {temperature.maxTemp}F</p>
        </div>
      )
      }
    </div >
  )
}

export default App
