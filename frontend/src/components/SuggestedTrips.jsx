
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { suggestedTrips, regions, budgetRanges, interests } from '../../data.js';

// --- ICONS ---
const MapPin = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
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

const DollarSign = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const Clock = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const Star = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const Search = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const Filter = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const Home = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ArrowRight = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// --- ANIMATED BACKGROUND ---
const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse" />
  </div>
);

// --- MAIN COMPONENT ---
const SuggestedTrips = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [selectedInterest, setSelectedInterest] = useState('All');

  // Filter logic
  const filteredTrips = suggestedTrips.filter(trip => {
    const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || trip.region === selectedRegion;
    const matchesInterest = selectedInterest === 'All' || trip.highlights.includes(selectedInterest);
    
    let matchesBudget = true;
    if (selectedBudget !== 'All') {
      const budget = parseInt(trip.budgetRange.match(/\d+/)[0]);
      if (selectedBudget.includes('Budget')) matchesBudget = budget <= 20000;
      else if (selectedBudget.includes('Mid-Range')) matchesBudget = budget > 20000 && budget <= 35000;
      else if (selectedBudget.includes('Luxury')) matchesBudget = budget > 35000;
    }

    return matchesSearch && matchesRegion && matchesInterest && matchesBudget;
  });

  const handlePlanTrip = (destination) => {
    localStorage.removeItem('itineraryData');
    window.dispatchEvent(new Event('itineraryUpdated'));
    navigate('/form', { state: { prefillDestination: destination } });
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <AnimatedBackground />

      <div className="relative z-10 px-4 md:px-6 py-12 md:py-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12">
          <button
            onClick={() => navigate('/')}
            className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>

          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center gap-3 backdrop-blur-xl bg-white/5 px-6 py-3 rounded-full border border-white/10 shadow-lg">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Explore India
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Suggested Trips
              </span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
              Discover handpicked destinations across India, from serene beaches to majestic mountains
            </p>
          </div>

          {/* Search & Filters */}
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 border border-white/10 shadow-2xl">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="flex items-center gap-2 text-white text-sm font-semibold mb-2">
                  <Filter className="w-4 h-4" />
                  Region
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer"
                >
                  {regions.map(region => (
                    <option key={region} value={region} className="bg-slate-900">
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white text-sm font-semibold mb-2">
                  <DollarSign className="w-4 h-4" />
                  Budget
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer"
                >
                  {budgetRanges.map(budget => (
                    <option key={budget} value={budget} className="bg-slate-900">
                      {budget}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white text-sm font-semibold mb-2">
                  <MapPin className="w-4 h-4" />
                  Interest
                </label>
                <select
                  value={selectedInterest}
                  onChange={(e) => setSelectedInterest(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer"
                >
                  {interests.map(interest => (
                    <option key={interest} value={interest} className="bg-slate-900">
                      {interest}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="max-w-7xl mx-auto mb-8">
          <p className="text-slate-400">
            Showing <span className="text-white font-bold">{filteredTrips.length}</span> destinations
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips.map((trip, index) => (
            <div
              key={trip.id}
              className="group backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 backdrop-blur-xl bg-white/20 px-3 py-2 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-bold text-sm">{trip.rating}</span>
                </div>

                {/* Region Badge */}
                <div className="absolute top-4 left-4 backdrop-blur-xl bg-blue-500/20 border border-blue-500/30 px-3 py-1 rounded-full">
                  <span className="text-blue-300 text-xs font-semibold">{trip.region}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">{trip.name}</h3>
                  <p className="text-purple-400 text-sm font-semibold">{trip.tagline}</p>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {trip.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {trip.highlights.slice(0, 4).map((highlight, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full backdrop-blur-xl bg-purple-500/10 border border-purple-500/20 text-purple-300"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Best Time</p>
                      <p className="text-sm text-white font-semibold">{trip.bestSeason.split(' - ')[0]}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Duration</p>
                      <p className="text-sm text-white font-semibold">{trip.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 col-span-2">
                    <DollarSign className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Budget Range</p>
                      <p className="text-sm text-white font-semibold">{trip.budgetRange}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanTrip(trip.name)}
                  className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
                >
                  Plan Trip
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTrips.length === 0 && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-12 border border-white/10">
              <MapPin className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No destinations found</h3>
              <p className="text-slate-400">Try adjusting your filters or search query</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestedTrips;
