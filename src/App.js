import React, { useState, useRef } from "react";
import { hot } from "react-hot-loader/root";
import LyricsInput from "./components/LyricsInput";
import ToggleButton from "./components/ToggleButton";

import { randomLyricsArray } from "./utils";
import { ReactiveBase, ReactiveList } from "@appbaseio/reactivesearch";
const APP_NAME = {
  KNN: "knn_lyrics_app",
  TEXT: "text_lyrics_app",
};

function App() {
  const [appName, setAppName] = useState(APP_NAME.TEXT);

  const [lyricsText, setLyricsText] = useState("");
  const currentSelectedRandomLyrics = useRef(null);
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
    <div>
      <nav>
        <h2>Lyrics Search App </h2>

        <a href="#">View Blog</a>
      </nav>
      <ReactiveBase
        app={appName}
        enableAppbase
        url="https://readonly:LF*$Sst`ENR>6}J9@calm-river-nesrtpa-arc.searchbase.io"
      >
        <div className="flex-column">
          <div>
            <ToggleButton
              checked={appName === APP_NAME.TEXT}
              handleChange={(checked) =>
                setAppName(APP_NAME[checked ? "TEXT" : "KNN"])
              }
              labelBefore="KNN"
              labelAfter="TEXT"
            />
            <LyricsInput
              lyricsText={lyricsText}
              setLyricsText={setLyricsText}
              handleGenerateRandomLyrics={handleGenerateRandomLyrics}
            />
          </div>
          <ReactiveList
            size={3}
            highlight
            infiniteScroll={false}
            dataField="Lyric"
            className="result-wrapper"
            showResultStats={true}
            componentId="lyric-result"
            showLoader={false}
            pagination={false}
            react={{ and: ["lyric-input"] }}
            render={({ data, loading }) => {
              return (
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "20px",
                    marginTop: "1.5rem",
                  }}
                >
                  {loading && (
                    <div className="loader">
                      {" "}
                      <img height="150px" src="https://i.gifer.com/XVo6.gif" />
                    </div>
                  )}
                  {data &&
                    data.map((item) => {
                      return (
                        <div
                          key={item._id + new Date().getTime() + Math.random()}
                          className="lyric-item"
                        >
                          <h4>{item.SName} </h4>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: item.Lyric.replace(/\n/g, "<br />"),
                            }}
                          ></p>{" "}
                        </div>
                      );
                    })}
                </div>
              );
            }}
          />
        </div>
      </ReactiveBase>
    </div>
  );
}

export default hot(App);
