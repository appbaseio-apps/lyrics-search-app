import React, { useState, useEffect, useRef } from "react";

import { DataSearch } from "@appbaseio/reactivesearch";
import { randomLyricsArray } from "../utils";
const LyricsInput = (props) => {
  const [lyricsText, setLyricsText] = useState("");
  const currentSelectedRandomLyrics = useRef(null);
  useEffect(() => {
    const { setQuery, dataField } = props;
    if (lyricsText) {
      let query = DataSearch.defaultQuery(lyricsText, {
        queryFormat: "or",
        type: "search",
        dataField,
      });

      setQuery({ query, value: lyricsText });
    } else {
      setQuery(null);
    }
  }, [lyricsText]);

  const handleChange = (e) => {
    setLyricsText(e.target.value);
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

  return (
    <div className="input-wrapper">
      <textarea
        onChange={handleChange}
        value={lyricsText}
        placeholder="Paste Lyrics here..."
        rows="20"
        cols="30"
      />
      <button onClick={handleGenerateRandomLyrics}>
        Generate Random Lyrics
      </button>
    </div>
  );
};

export default LyricsInput;
