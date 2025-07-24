const estimateCalories = (durationMin: number, totalSets: number, weightKg: number) => {
  const MET_strength = 5.0; // Moderate weight training
  const intensityFactor = Math.min(1 + totalSets * 0.05, 2); 

  const calories = (MET_strength * weightKg * durationMin / 60) * intensityFactor;
  return Math.round(calories);
};
export default estimateCalories;