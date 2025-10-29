import './Dashboard.css';

export default function Dashboard() {
  const username = localStorage.getItem('currentUser');
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const scores = (users[username]?.scores || []).slice(-5).reverse();

  return (
    <div className="dashboard-container">
      <h2>Dashboard - Last 5 Scores</h2>
      <ul className="dashboard-scores">
        {scores.length === 0 ? (
          <li>No scores yet. Play the game!</li>
        ) : (
          scores.map((score, idx) => (
            <li key={idx}>
              <span>Attempts: {score.attempts}</span>
              <span>{score.date}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
