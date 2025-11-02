import React from "react";

const ChevronRight = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const CardSection = ({ title, items, color }) => (
  <div>
    <h4 className={`text-lg font-semibold mb-2 ${color}`}>{title}</h4>
    <ul className="space-y-1 text-sm text-gray-300">
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <ChevronRight className={`w-4 h-4 mr-2 ${color}`} />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export const DayCard = ({ day, index }) => (
  <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6 animate-fade-in">
    <h2 className="text-3xl md:text-5xl font-extrabold text-white gradient-text">
      {day.title}
    </h2>
    <p className="text-xl text-primary/80 border-b border-primary/20 pb-2">
      {day.day}: Detailed Itinerary
    </p>

    <p className="text-muted-foreground leading-relaxed">{day.description}</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
      <CardSection
        title="Places to Visit"
        items={day.places_to_visit}
        color="text-yellow-400"
      />
      <CardSection
        title="Activities"
        items={day.activities}
        color="text-pink-400"
      />
      <CardSection
        title="Food Recommendations"
        items={day.food_recommendations}
        color="text-green-400"
      />
    </div>

    <p className="text-sm text-white/50 pt-4">-- End of Day {index + 1} --</p>
  </div>
);
