import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MapPin = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Heart = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const Calendar = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const Sun = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const Sparkles = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const Loader = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse" />
  </div>
);

const LoadingVisualization = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl">
    <div className="text-center space-y-8 px-6">
      <div className="relative mx-auto w-32 h-32">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin opacity-20 blur-xl" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse" 
             style={{ animationDuration: '2s' }}>
          <MapPin className="w-full h-full p-8 text-white animate-bounce" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Creating Your Perfect Trip
        </h2>
        
        <div className="space-y-2 text-slate-300">
          <p className="text-lg animate-pulse">✨ Analyzing your preferences...</p>
          <p className="text-lg animate-pulse" style={{ animationDelay: '0.5s' }}>🗺️ Finding best destinations...</p>
          <p className="text-lg animate-pulse" style={{ animationDelay: '1s' }}>🎯 Planning activities...</p>
          <p className="text-lg animate-pulse" style={{ animationDelay: '1.5s' }}>🍽️ Selecting restaurants...</p>
        </div>

        <div className="w-full max-w-md mx-auto h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-loading-bar" />
        </div>
      </div>
    </div>
  </div>
);

const ItineraryForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    destination: '',
    interests: '',
    season: '',
    days: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    console.log('Sending request...', formData);
    
    const response = await fetch('http://localhost:8000/api/iti/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    console.log('Response status:', response.status);

    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate itinerary');
    }

    localStorage.setItem('itineraryData', JSON.stringify(data));
    
    window.dispatchEvent(new Event('itineraryUpdated'));
    
    navigate('/iti-home');
    
  } catch (err) {
    console.error('Error:', err);
    
    if (err.message.includes('Failed to fetch') || err.message.includes('ERR_CONNECTION_REFUSED')) {
      setError('❌ Cannot connect to server. Please make sure the backend is running on http://localhost:8000');
    } else {
      setError(err.message);
    }
    
    setLoading(false);
  }
};


  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
  const popularDestinations = ['Paris, France', 'Tokyo, Japan', 'Bali, Indonesia', 'New York, USA', 'Shimla, India'];
  const interestSuggestions = ['beaches', 'temples', 'adventure', 'food', 'shopping', 'nature', 'culture', 'nightlife'];

  return (
    <>
      {loading && <LoadingVisualization />}
      
      <div className="min-h-screen relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <AnimatedBackground />
        
        <div className="relative z-10 px-4 md:px-6 py-12 md:py-20 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 space-y-6">
              <div className="inline-flex items-center gap-3 backdrop-blur-xl bg-white/5 px-6 py-3 rounded-full border border-white/10 shadow-lg mb-6 hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                  Plan Your Dream Trip
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  Create Your Itinerary
                </span>
              </h1>

              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                Tell us about your travel preferences and we'll create a personalized itinerary just for you
              </p>
            </div>

            {/* Form Card */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Destination */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-white font-semibold text-lg">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g., Paris, France"
                    required
                    className="w-full px-6 py-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {popularDestinations.map((dest) => (
                      <button
                        key={dest}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, destination: dest }))}
                        className="px-4 py-2 text-xs rounded-full backdrop-blur-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 transition-colors"
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-white font-semibold text-lg">
                    <Heart className="w-5 h-5 text-purple-400" />
                    Interests
                  </label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    placeholder="e.g., beaches, temples, food, shopping"
                    required
                    className="w-full px-6 py-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {interestSuggestions.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => {
                          const current = formData.interests;
                          const newInterests = current ? `${current}, ${interest}` : interest;
                          setFormData(prev => ({ ...prev, interests: newInterests }));
                        }}
                        className="px-4 py-2 text-xs rounded-full backdrop-blur-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-colors"
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Season */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-white font-semibold text-lg">
                      <Sun className="w-5 h-5 text-pink-400" />
                      Season
                    </label>
                    <select
                      name="season"
                      value={formData.season}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300 cursor-pointer"
                    >
                      <option value="" className="bg-slate-900">Select Season</option>
                      {seasons.map((season) => (
                        <option key={season} value={season.toLowerCase()} className="bg-slate-900">
                          {season}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Days */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-white font-semibold text-lg">
                      <Calendar className="w-5 h-5 text-orange-400" />
                      Number of Days
                    </label>
                    <input
                      type="number"
                      name="days"
                      value={formData.days}
                      onChange={handleChange}
                      placeholder="e.g., 5"
                      min="1"
                      max="30"
                      required
                      className="w-full px-6 py-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                    />
                  </div>
                </div>

                {error && (
                  <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-2xl p-4 animate-fade-in">
                    <p className="text-red-300 text-sm flex items-center gap-2">
                      <span className="text-red-400 text-xl">⚠️</span>
                      {error}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative group px-8 py-5 text-lg font-bold text-white backdrop-blur-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-600 before:via-purple-600 before:to-blue-600 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <Loader className="w-6 h-6" />
                        Generating Your Itinerary...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6" />
                        Generate Itinerary
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="backdrop-blur-xl bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20 hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">AI-Powered</h3>
                <p className="text-slate-400 text-sm">Personalized itineraries generated by advanced AI</p>
              </div>

              <div className="backdrop-blur-xl bg-purple-500/10 rounded-2xl p-6 border border-purple-500/20 hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Detailed Plans</h3>
                <p className="text-slate-400 text-sm">Day-by-day activities, places, and recommendations</p>
              </div>

              <div className="backdrop-blur-xl bg-pink-500/10 rounded-2xl p-6 border border-pink-500/20 hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Customized</h3>
                <p className="text-slate-400 text-sm">Tailored to your interests and preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItineraryForm;