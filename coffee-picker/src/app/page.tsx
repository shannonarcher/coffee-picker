"use client";
import { useState } from "react";

export default function CoffeePicker() {
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const coffeeShops = [
    { name: "Good Ambler" },
    { name: "The Emily" },
    { name: "Foxtrot" },
  ];

  const handleSelect = (shop: string) => {
    setSelectedShop(shop);
  };

  const handleRoll = () => {
    console.log("ROLLING");
    setIsRolling(true);
    const cycles = 3; // Number of full cycles through all options
    let currentIndex = 0;
    let delay = 100; // Starting delay in milliseconds (fast at first)
    let totalIterations = 0;
    const maxIterations = cycles * coffeeShops.length + 5; // Extra iterations for slowdown

    const interval = setInterval(() => {
      setSelectedShop(coffeeShops[currentIndex].name);
      currentIndex = (currentIndex + 1) % coffeeShops.length;
      totalIterations++;

      if (totalIterations > cycles * coffeeShops.length) {
        delay += 100; // Slow down after completing specified cycles
      }

      if (totalIterations >= maxIterations || delay > 600) {
        clearInterval(interval);
        // Final selection after slowing down
        const randomIndex = Math.floor(Math.random() * coffeeShops.length);
        setSelectedShop(coffeeShops[randomIndex].name);
        setIsRolling(false);
      }
    }, delay);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-0 m-0">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Coffee?
        </h1>
        <p className="text-gray-300 mb-6 text-center"></p>
        <div className="space-y-4">
          {coffeeShops.map((shop) => (
            <div
              key={shop.name}
              className={`p-4 rounded-md border cursor-pointer transition-all ${
                selectedShop === shop.name
                  ? "border-blue-400 bg-blue-900 animate-pulse"
                  : "border-gray-600 hover:border-gray-500 bg-gray-700"
              }`}
              onClick={() => !isRolling && handleSelect(shop.name)}
            >
              <h2 className="text-lg font-semibold text-white">{shop.name}</h2>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center min-h-[60px]">
          {" "}
          {/* Reserved space to prevent layout shift */}
          {selectedShop && !isRolling ? (
            <>
              <p className="text-lg mb-2 text-gray-200">
                You&apos;ve selected{" "}
                <span className="font-bold text-white">{selectedShop}</span>!
              </p>
              <button
                onClick={handleRoll}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Choose Again
              </button>
            </>
          ) : (
            <button
              onClick={handleRoll}
              disabled={isRolling}
              className={`mt-2 px-4 py-2 rounded text-white ${
                isRolling
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isRolling ? "Rolling..." : "Roll"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
