import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import './LeaderBoard.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Leaderboard() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const data = [];

    Object.keys(users).forEach((username) => {
      const scores = users[username]?.scores || [];
      const validScores = scores.filter((s) => s.attempts > 0);

      if (validScores.length) {
        const bestScore = validScores.reduce(
          (min, s) => (s.attempts < min ? s.attempts : min),
          Infinity
        );
        data.push({ username, bestScore });
      }
    });

    // Sort by best score (lower attempts = better rank)
    data.sort((a, b) => a.bestScore - b.bestScore);

    if (data.length) {
      setChartData({
        labels: data.map((d) => d.username),
        datasets: [
          {
            label: 'Best Attempts (Lower is Better)',
            data: data.map((d) => d.bestScore),
            backgroundColor: '#007BFF',
            borderRadius: 5,
          },
        ],
      });
    }
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard - Best Scores</h2>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true, ticks: { stepSize: 1 } },
            },
          }}
        />
      ) : (
        <p>No valid game data available. Play to appear on leaderboard!</p>
      )}
    </div>
  );
}
