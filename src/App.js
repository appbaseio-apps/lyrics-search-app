import React, { useState } from "react";
import { hot } from "react-hot-loader/root";
import LyricsInput from "./components/LyricsInput";
import ToggleButton from "./components/ToggleButton";

import { ReactiveBase, ReactiveList } from "@appbaseio/reactivesearch";
const APP_NAME = {
  KNN: "knn_lyrics_app",
  TEXT: "text_lyrics_app",
};

function App() {
  const [appName, setAppName] = useState(APP_NAME.TEXT);

  return (
    <ReactiveBase
      app={appName}
      enableAppbase
      url="https://readonly:LF*$Sst`ENR>6}J9@calm-river-nesrtpa-arc.searchbase.io"
    >
      <div className="row">
        <div className="col max-width">
          <ToggleButton
            checked={appName === APP_NAME.TEXT}
            handleChange={(checked) =>
              setAppName(APP_NAME[checked ? "TEXT" : "KNN"])
            }
            labelBefore="KNN"
            labelAfter="TEXT"
          />
          <LyricsInput dataField={["Name", "Description"]} />
        </div>
        <div className="col">
          <ReactiveList
            size={3}
            infiniteScroll
            dataField="Lyric"
            className="result-wrapper"
            showResultStats={true}
            componentId="lyric-result"
            showLoader={false}
            pagination={false}
            react={{ and: ["lyric-input"] }}
            render={({ data, loading }) => {
              return (
                <div style={{ position: "relative" }}>
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
      </div>
    </ReactiveBase>
  );
}

export default hot(App);
