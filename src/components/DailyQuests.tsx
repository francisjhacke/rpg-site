import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const moods = ["😃", "🙂", "😐", "😔", "😢"];

const DailyQuests: React.FC = () => {
  const [mood, setMood] = useState<string>("");
  const [sunlight, setSunlight] = useState(false);
  const [movement, setMovement] = useState(false);
  const [reflection, setReflection] = useState("");

  return (
    <Card className="p-4 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">
          How are you feeling today?
        </h2>
        <div className="flex gap-2 justify-center">
          {moods.map((m) => (
            <button
              key={m}
              className={`text-3xl p-1 rounded-full border-2 ${
                mood === m ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setMood(m)}
              aria-label={m}
              type="button"
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">Today’s Vital Check</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="sunlight"
            checked={sunlight}
            onCheckedChange={(checked) => setSunlight(checked === true)}
          />
          <Label htmlFor="sunlight">Did you get sunlight today?</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="movement"
            checked={movement}
            onCheckedChange={(checked) => setMovement(checked === true)}
          />
          <Label htmlFor="movement">Did you move your body today?</Label>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Daily Reflection</h2>
        <Input
          placeholder="One small win or positive moment..."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
      </div>
    </Card>
  );
};

export default DailyQuests;
