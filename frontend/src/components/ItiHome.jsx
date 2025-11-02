import { ArrowDown, Calendar, DollarSign, Lightbulb, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import heroImage from "../assets/shimla-hero.jpg";

const ItiHome = ({ title, introduction, destination, bestTimeToVisit, estimatedBudget, travelTips }) => {
  const navigate = useNavigate();

  const scrollToDetails = () => {
    document.getElementById('details-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleExploreItinerary = () => {
    navigate('/iti-timeline'); // Navigate to timeline
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/85 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center space-y-8">
          <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/10 px-8 py-4 rounded-full border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300">
            <MapPin className="w-5 h-5 text-blue-400" />
            <p className="text-sm font-semibold tracking-wider text-white uppercase">
              {destination}
            </p>
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              {title}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
            {introduction}
          </p>

          <div className="pt-12 flex gap-4 justify-center flex-wrap">
            <button 
              onClick={scrollToDetails}
              className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-white backdrop-blur-xl bg-gradient-to-r from-blue-600 to-purple-600 rounded-full overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Learn More</span>
              <ArrowDown className="w-5 h-5 relative z-10 group-hover:translate-y-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button 
              onClick={handleExploreItinerary}
              className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-white backdrop-blur-xl bg-gradient-to-r from-pink-600 to-orange-600 rounded-full overflow-hidden shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Explore Itinerary</span>
              <ArrowDown className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform rotate-[-90deg]" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </section>

      <section id="details-section" className="relative px-6 py-24 bg-slate-950">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block backdrop-blur-xl bg-white/5 px-6 py-2 rounded-full border border-white/10 mb-6">
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Plan Your Trip
              </p>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Essential Information
              </span>
            </h2>
            <p className="text-slate-400 text-xl font-light max-w-2xl mx-auto">
              Everything you need to know before you embark on your adventure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-8 h-8 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                    Best Time to Visit
                    <Clock className="w-5 h-5 text-blue-400" />
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {bestTimeToVisit}
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Estimated Budget
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-lg font-semibold">
                    {estimatedBudget}
                  </p>
                  <p className="text-slate-400 text-sm mt-2">
                    Per person (approx.)
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative backdrop-blur-xl bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-3xl p-8 border border-white/10 hover:border-pink-500/50 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center shadow-lg shadow-pink-500/50 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Travel Tips
                  </h3>
                  <ul className="space-y-3">
                    {travelTips.map((tip, index) => (
                      <li 
                        key={index} 
                        className="flex items-start gap-3 text-slate-300 group/item hover:text-white transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center gap-6 backdrop-blur-xl bg-white/5 px-12 py-8 rounded-3xl border border-white/10">
              <p className="text-slate-300 text-lg">
                Ready to start your adventure?
              </p>
              <button 
                onClick={handleExploreItinerary}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                View Full Itinerary →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItiHome;