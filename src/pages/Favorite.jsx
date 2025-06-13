import React, { useState } from 'react';

const FavoritePage = () => {
  const dummyFavorites = [
    { word: 'Euphoria', definition: 'A feeling of intense excitement and happiness.', part_of_speech: 'noun' },
    { word: 'Resilience', definition: 'The capacity to recover quickly from difficulties.', part_of_speech: 'noun' },
    { word: 'Serendipity', definition: 'The occurrence of events by chance in a happy way.', part_of_speech: 'noun' },
    { word: 'Cacophony', definition: 'A harsh, discordant mixture of sounds.', part_of_speech: 'noun' },
  ];

  const [favorites, setFavorites] = useState(dummyFavorites);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const handleDelete = (word) => {
    setFavorites(favorites.filter((fav) => fav.word !== word));
  };

  const handleClearAll = () => {
    if (alert('Are you sure you want to clear all favorites?')) {
      setFavorites([]);
    }
  };

  const filtered = favorites
    .filter((f) => f.word.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortAsc ? a.word.localeCompare(b.word) : b.word.localeCompare(a.word));

  return (
    <div className="min-h-screen w-full bg-[#3a0ca3] py-6 px-4">
      <h1 className="text-white text-xl font-bold text-center mb-4">
        Your Favorite Words
      </h1>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search word..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-md outline-none border-none mb-3"
        />

        <div className="flex justify-between gap-3 mb-4">
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="bg-[#4cc9f0] text-[#3a0ca3] font-bold py-2 px-4 rounded-md"
          >
            Sort: {sortAsc ? 'A-Z' : 'Z-A'}
          </button>
          <button
            onClick={handleClearAll}
            className="bg-white text-[#3a0ca3] font-bold py-2 px-4 rounded-md border border-[#4cc9f0]"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        {filtered.length === 0 ? (
          <p className="text-[#4cc9f0] text-center">No favorites found.</p>
        ) : (
          filtered.map((word, index) => (
            <div
              key={index}
              className="relative border-l-4 md:w-[350px] w-[94%] rounded-md p-3 shadow-lg bg-white border-l-[#4cc9f0]"
            >
              <button
                onClick={() => handleDelete(word.word)}
                className="absolute top-2 right-3 text-[#3a0ca3] text-xl font-bold"
                title="Remove"
              >
                ×
              </button>
              <h2 className="text-[#3a0ca3] font-semibold text-lg">{word.word}</h2>
              <p className="text-sm mt-1">
                <strong>Definition:</strong> {word.definition}
              </p>
              <p className="text-sm">
                <strong>Part of Speech:</strong> {word.part_of_speech}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritePage;
