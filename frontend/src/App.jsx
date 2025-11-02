import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import staticData from '../staticData.js'
import ItiHome from './components/ItiHome.jsx'
import SuggestedTrips from './components/SuggestedTrips.jsx'
import { Timeline } from './components/Timeline.jsx'
import HomePage from './components/HomePage.jsx'
import ItineraryForm from './components/ItineraryForm.jsx'

function App() {
  const [itineraryData, setItineraryData] = useState(staticData);

  useEffect(() => {
    const loadData = () => {
      const storedData = localStorage.getItem('itineraryData');
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          console.log('✅ Loaded data from localStorage:', parsed); // Debug log
          setItineraryData(parsed);
        } catch (err) {
          console.error('❌ Error parsing stored data:', err);
          setItineraryData(staticData);
        }
      } else {
        console.log('ℹ️ No stored data, using static data');
        setItineraryData(staticData);
      }
    };

    loadData();

    window.addEventListener('storage', loadData);

    window.addEventListener('itineraryUpdated', loadData);

    return () => {
      window.removeEventListener('storage', loadData);
      window.removeEventListener('itineraryUpdated', loadData);
    };
  }, []);

  const handleBackToHome = () => {
    console.log("Back to home clicked");
  };

  return (
    <Router>
      <Routes>

        <Route path='/' element={<HomePage/>}/>
        <Route path='/suggested-trips' element={<SuggestedTrips />} />
        <Route path='/form' element={<ItineraryForm />} />
        
        <Route path='iti-home' element={
          <ItiHome
            title={itineraryData.title}
            introduction={itineraryData.introduction}
            destination={itineraryData.destination}
            bestTimeToVisit={itineraryData.best_time_to_visit || itineraryData.bestTimeToVisit}
            estimatedBudget={itineraryData.estimated_budget || itineraryData.estimatedBudget}
            travelTips={itineraryData.travel_tips || itineraryData.travelTips || []} 
          />
        }/>
        
        <Route path='iti-timeline' element={
          <Timeline 
            days={itineraryData.days || []} 
            onBack={handleBackToHome}
            title={itineraryData.title}
          />
        }/>
      </Routes>
    </Router>
  )
}

export default App