import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DayCard } from "./DayCard.jsx";

// --- ENHANCED ICONS ---
const ChevronLeft = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const Home = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const MapPin = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Activity = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const Utensils = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
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

// --- ENHANCED BUTTON COMPONENT ---
const Button = ({ children, onClick, disabled, variant, className, size = "default" }) => {
  const baseClasses = "rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 inline-flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const variantClasses = {
    outline: "border-2 border-blue-500/40 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400/60 backdrop-blur-xl bg-white/5 shadow-lg hover:shadow-blue-500/20",
    default: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/40 before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-600 before:via-purple-600 before:to-blue-600 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant || 'default']} ${className || ''} ${!disabled && 'hover:scale-105 active:scale-95'}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

// --- ANIMATED BACKGROUND COMPONENT ---
const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse" />
  </div>
);

// --- MAIN TIMELINE COMPONENT ---
export const Timeline = ({ days, onBack, title }) => {
    const navigate = useNavigate(); // Add this hook

  const [selectedDay, setSelectedDay] = useState(null);
  const handleOnBack = () => {
    
    navigate('/iti-home'); // Navigate to home route


  };
  // DETAIL VIEW
  if (selectedDay !== null) {
    return (
      <div className="min-h-screen relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <AnimatedBackground />
        
        <div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-20 animate-fade-in">
          {/* Enhanced Navigation Header */}
          <div className="w-full max-w-5xl mb-12">
            <div className="backdrop-blur-2xl bg-white/5 rounded-3xl p-6 border border-white/10 shadow-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Button
                  onClick={() => setSelectedDay(null)}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Home className="w-5 h-5" />
                  Timeline
                </Button>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))}
                    disabled={selectedDay === 0}
                    variant="outline"
                    className="flex-1 sm:flex-initial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>
                  
                  <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 rounded-2xl border border-white/20 shadow-lg">
                    <p className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
                      Day {selectedDay + 1} / {days.length}
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => setSelectedDay(Math.min(days.length - 1, selectedDay + 1))}
                    disabled={selectedDay === days.length - 1}
                    variant="outline"
                    className="flex-1 sm:flex-initial"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Day Card */}
          <div className="w-full max-w-5xl">
            <DayCard day={days[selectedDay]} index={selectedDay} />
          </div>
        </div>
      </div>
    );
  }

  // TIMELINE LIST VIEW
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <AnimatedBackground />
      
      <div className="relative z-10 px-4 md:px-6 py-12 md:py-20 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-20 space-y-6">
            <div className="inline-flex items-center gap-3 backdrop-blur-xl bg-white/5 px-6 py-3 rounded-full border border-white/10 shadow-lg mb-6 hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Your Journey Awaits
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient block mb-2">
                {title}
              </span>
              <span className="text-2xl md:text-3xl text-slate-400 font-light">
                {days.length}-Day Adventure
              </span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
              Explore each day's exciting itinerary filled with unforgettable experiences
            </p>

            <div className="pt-4">
              <Button 
                onClick={handleOnBack} 
                variant="outline"
                size="lg"
                className="shadow-xl"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </div>
          </div>

          {/* Enhanced Timeline */}
          <div className="relative">
            {/* Animated Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block z-0 rounded-full shadow-lg shadow-purple-500/50">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 blur-sm animate-pulse" />
            </div>

            {/* Timeline Items */}
            <div className="space-y-16 md:space-y-24">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col gap-8 animate-slide-in-up`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Enhanced Content Card */}
                  <div 
                    className={`flex-1 group cursor-pointer ${
                      index % 2 !== 0 ? 'md:ml-auto' : 'md:mr-auto'
                    } max-w-full md:max-w-[48%] w-full`}
                    onClick={() => setSelectedDay(index)}
                  >
                    <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-purple-500/20 hover:border-purple-500/30 relative overflow-hidden">
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-3xl" />
                      
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform duration-300">
                              <span className="text-2xl font-black text-white">{index + 1}</span>
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider block">{day.day}</span>
                              <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                                {day.title}
                              </h3>
                            </div>
                          </div>
                          
                          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full border border-purple-500/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <span className="text-xs font-bold text-purple-300 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Explore
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-300 leading-relaxed mb-6 line-clamp-3">
                          {day.description}
                        </p>
                        
                        {/* Enhanced Stats Grid */}
                        <div className="grid grid-cols-3 gap-3">
                          <div className="backdrop-blur-xl bg-blue-500/10 rounded-2xl p-4 border border-blue-500/20 hover:bg-blue-500/20 transition-colors duration-300 group/stat">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-4 h-4 text-blue-400 group-hover/stat:scale-110 transition-transform" />
                              <span className="text-xs text-blue-400 font-semibold uppercase">Places</span>
                            </div>
                            <p className="text-2xl font-black text-white">{day.places_to_visit.length}</p>
                          </div>
                          
                          <div className="backdrop-blur-xl bg-purple-500/10 rounded-2xl p-4 border border-purple-500/20 hover:bg-purple-500/20 transition-colors duration-300 group/stat">
                            <div className="flex items-center gap-2 mb-2">
                              <Activity className="w-4 h-4 text-purple-400 group-hover/stat:scale-110 transition-transform" />
                              <span className="text-xs text-purple-400 font-semibold uppercase">Activities</span>
                            </div>
                            <p className="text-2xl font-black text-white">{day.activities.length}</p>
                          </div>
                          
                          <div className="backdrop-blur-xl bg-pink-500/10 rounded-2xl p-4 border border-pink-500/20 hover:bg-pink-500/20 transition-colors duration-300 group/stat">
                            <div className="flex items-center gap-2 mb-2">
                              <Utensils className="w-4 h-4 text-pink-400 group-hover/stat:scale-110 transition-transform" />
                              <span className="text-xs text-pink-400 font-semibold uppercase">Food</span>
                            </div>
                            <p className="text-2xl font-black text-white">{day.food_recommendations.length}</p>
                          </div>
                        </div>

                        {/* Click Hint */}
                        <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                          <span className="text-sm text-slate-400">Click to view full itinerary</span>
                          <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Center Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:block">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/50 border-4 border-slate-950 animate-pulse" />
                      <div className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 blur-xl animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action Footer */}
          <div className="mt-24 text-center">
            <div className="inline-block backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-10 border border-white/10 shadow-2xl hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold text-white mb-3">Ready for Your Adventure?</h3>
              <p className="text-slate-400 mb-6 max-w-md">Click on any day above to explore detailed itinerary and make the most of your trip!</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" className="shadow-xl">
                  Start Planning
                </Button>
                <Button variant="outline" size="lg">
                  Download Itinerary
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};