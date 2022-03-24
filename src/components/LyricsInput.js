import React, { useState, useEffect } from "react";

import { DataSearch } from "@appbaseio/reactivesearch";
const LyricsInput = (props) => {
  const [lyricsText, setLyricsText] = useState("");

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

  return (
    <div className="input-wrapper">
      <textarea
        onChange={handleChange}
        value={lyricsText}
        placeholder="Paste Lyrics here..."
        rows="20"
        cols="30"
      />
    </div>
  );
};

export default LyricsInput;
