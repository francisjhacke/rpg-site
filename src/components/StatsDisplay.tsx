import React from "react";

type StatsDisplayProps = {
  stats: Record<string, any>;
};

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => (
  <div className="w-full max-w-md mx-auto my-0 bg-background/80 rounded-2xl shadow-lg p-8 flex flex-col items-center">
    <h2 className="text-2xl font-bold mb-2 text-center">Stats</h2>
    <p className="text-muted-foreground mb-6 text-center">
      Here are your calculated stats:
    </p>
    <ul className="w-full flex flex-col gap-2 items-center">
      {Object.entries(stats).map(([key, value]) => (
        <li
          key={key}
          className="w-full flex justify-between border-b border-muted py-2 last:border-b-0"
        >
          <span className="capitalize font-medium">{key}</span>
          <span className="font-mono text-primary">{value}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default StatsDisplay;
