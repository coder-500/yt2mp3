import axios from "axios";
import { useRef, useState } from "react";

import logo from "./assets/music.png";
import search from "./assets/search.png";
import { youtube_parser } from "./utils";

function App() {
  const [urlResult, setUrlResult] = useState(null);
  const inpRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const ytId = youtube_parser(inpRef.current.value);

    // console.log(ytId);

    const options = {
      method: "GET",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      params: { id: ytId },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_YTMP3_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
    };
    axios(options)
      .then((res) => setUrlResult(res.data.link))
      .catch((err) => console.log(err));
  };
  return (
    <div className="app">
      <span className="logo">
        <img src={logo} alt="logo" width={30} />
        yt2mp3
      </span>
      <section className="content">
        <h1 className="content-title">YouTube to MP3 Converter</h1>
        <p className="content-desc">
          Convert and download YouTube videos as mp3 file!
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input
            ref={inpRef}
            type="text"
            name="urlInput"
            id="urlInp"
            placeholder="Paste the YouTube video url here..."
            className="form-inp"
          />
          <button type="submit" className="form-btn">
            <img src={search} alt="search" width={20} />
          </button>
        </form>

        {urlResult ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={urlResult}
            className="download-btn"
          >
            Download MP3
          </a>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}

export default App;
