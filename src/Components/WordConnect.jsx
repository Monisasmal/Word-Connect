import React, { useEffect, useState } from 'react';
import { connectedWords } from '../data';
import './WordConnect.css';

export default function WordConnectGame() {
  const [groupSize, setGroupSize] = useState(2);
  const [wordList, setWordList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const group = connectedWords.get(groupSize);
    const words = group.flat().sort(() => Math.random() - 0.5);
    setWordList(words);
    setSelected([]);
    setMatched([]);
    setAttempts(0);
  }, [groupSize]);

  const handleClick = (word) => {
    if (selected.includes(word) || matched.includes(word)) return;
    const updated = [...selected, word];
    setSelected(updated);

    if (updated.length === groupSize) {
      setAttempts(prev => prev + 1);
      const groupSets = connectedWords.get(groupSize).map(set => new Set(set));
      const selectedSet = new Set(updated);
      const matchedGroup = groupSets.some(set =>
        [...set].every(word => selectedSet.has(word))
      );
      if (matchedGroup) setMatched(prev => [...prev, ...updated]);
      setTimeout(() => setSelected([]), 700);
    }
  };

  useEffect(() => {
    if (matched.length === wordList.length && wordList.length > 0) {
      const username = localStorage.getItem('currentUser');
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (users[username]) {
        users[username].scores.push({ attempts, date: new Date().toLocaleString() });
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  }, [matched, wordList, attempts]);

  return (
    <div className="game-container">
      <h2>Connect {groupSize} Related Words</h2>
      <select
        value={groupSize}
        onChange={(e) => setGroupSize(Number(e.target.value))}
        className="game-select"
      >
        <option value={2}>2 Words</option>
        <option value={3}>3 Words</option>
        <option value={4}>4 Words</option>
      </select>

      <div className={`grid grid-${groupSize}`}>
        {wordList.map((word, idx) => (
          <button
            key={idx}
            className={`word-btn ${
              matched.includes(word)
                ? 'correct'
                : selected.includes(word)
                ? 'selected'
                : ''
            }`}
            onClick={() => handleClick(word)}
          >
            {word}
          </button>
        ))}
      </div>

      <p>Total Attempts: {attempts}</p>
    </div>
  );
}
