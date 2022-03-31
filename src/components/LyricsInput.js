import React, { useState, useRef } from "react";

import { DataSearch } from "@appbaseio/reactivesearch";
import { randomLyricsArray } from "../utils";
const LyricsInput = () => {
  const [lyricsText, setLyricsText] = useState("");
  const currentSelectedRandomLyrics = useRef(null);
  const triggerQueryRef = useRef(null);

  const handleChange = (value, triggerQuery) => {
    if (!triggerQueryRef.current) {
      triggerQueryRef.current = triggerQuery;
    }
    if (value !== lyricsText) {
      setLyricsText(value);
    }
  };

  const handleGenerateRandomLyrics = () => {
    let textIndex = Math.floor(Math.random() * 10);
    while (
      currentSelectedRandomLyrics.current === randomLyricsArray[textIndex]
    ) {
      textIndex = Math.floor(Math.random() * 10);
    }
    setLyricsText(randomLyricsArray[textIndex]);
    currentSelectedRandomLyrics.current = randomLyricsArray[textIndex];
  };

  const performSearch = () => {
    triggerQueryRef.current?.();
  };
  return (
    <div className="input-wrapper">
      {" "}
      <button className="generate-lyrics" onClick={handleGenerateRandomLyrics}>
        Search Random Lyrics
      </button>
      <div title={lyricsText}>
        {" "}
        <DataSearch
          autosuggest={false}
          onChange={handleChange}
          value={lyricsText}
          placeholder="Paste Lyrics here..."
          dataField={["SName", "Lyric"]}
          componentId="lyric-input"
          className="lyrics-input-box"
          showIcon={false}
          onKeyDown={(e, triggerQuery) => {
            if (e.key === "Enter") {
              triggerQuery();
            }
          }}
        />
      </div>
      <button onClick={performSearch}>Search</button>{" "}
    </div>
  );
};

export default LyricsInput;
