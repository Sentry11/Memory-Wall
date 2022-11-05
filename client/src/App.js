import { useState,useEffect } from 'react';

import './App.css';

function App() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/activities`
      );
      const data = await result.json();
      setActivities(data);
    };
    fetchData();
  }, []);

  const addActivity = async (event) => {
    event.preventDefault();
    
    const newActivity = {
      name: event.target.activity.value,
      time: event.target.time.value,
    };
    
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newActivity),
    });
    
    event.target.activity.value = ""; // sets input empty after clicking submit
    event.target.time.value = ""; // sets input empty after clicking submit
    window.location.reload(); // reloads the window after sending request
    };

  return (
      <div className="app">
        <header className="app-header">
          <h1>Memory Wall</h1>
          <form onSubmit={addActivity}>
            <div className='box'>
              <label htmlFor="activity">Name : </label>
              <input
                type="text"
                id="activity"
                name="activity"
                autoComplete="off"
                placeholder='enter your name'
              />
            </div>
            <div className='box'>
              <label htmlFor="time">Time  : </label>
              <input type="text" id="time" name="time" autoComplete="off" placeholder='time of typing' />
            </div>
            <button type="submit">Add</button>
          </form>
        </header>
        <main className="app-main">
            <h2>List</h2>

          {activities && activities.length > 0 ? (
            <ol>
              {activities.map((activity) => (
                <li key={activity._id}>
                  {activity.name} - {activity.time}
                </li>
              ))}
            </ol>
          ) : (
            <p>No activities yet</p>
          )}
          </main>
      </div>
  );
}

export default App;
