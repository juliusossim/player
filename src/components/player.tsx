import { useRef, useEffect, useState } from "react";
// import { useRadio } from "../hooks/useRadio";
// Fontawesome
import {
  faPlay,
  faStop,
  faVolumeHigh
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// SCSS
import "../styles/player.scss";

// Radios obj
import radioObj from "../../src/objs/radios.json";
import { useRadio } from "../hooks/useRadio";
import { useStreamFail } from "../hooks/useStreamFail";
import { useTimeElapse } from "../hooks/useTimeElapse";

const PlayButton = ({ playing }: any) => {
  return <FontAwesomeIcon icon={!playing ? faPlay : faStop} />;
};

const LoadingButton = () => {
  return (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
};

const Player = () => {
  // Const
  const errorPlay = "Playing error. The player will be reinitialized";

  // References
  const audio = useRef<HTMLAudioElement>(new Audio(radioObj[2].url));

  // States
  const [playing, setPlaying] = useState<boolean>(false);
  const [radioList, setRadioList] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [logo, setLogo] = useState<string>(radioObj[2].logo);
  const [counter, setCounter] = useState<any>({
    sec: "00",
    min: "00",
    hour: "00"
  });
  const [volume, setVolume] = useState<any>(0.5);
 
  const toggle = () => {
    setPlaying(!playing);
    setRadioList(!radioList);
  };

  const handleError = () => setError(errorPlay);

  // Switch radio station
  const switchRadio = (station: {[key: string]: string | any}) => {
    setLogo(station.favicon);
    setRadioList(!radioList);
    setLoading(true);
    audio.current.pause();
    audio.current = new Audio(station.url);

    setPlaying(!playing);
  };

  const changeVolume = () => {
    audio.current.volume = volume;
  };
  const { stations } = useRadio({});
  useStreamFail({ handleError, audio, playing, setPlaying, setLoading })
  useTimeElapse({ playing, audio, setCounter })

  return (
    <>
      <div className="container">
        <div id="player">
          <div className="first">
            <div className="timer">
              <span>{counter.hour}</span>
              <span>:</span>
              <span>{counter.min}</span>
              <span>:</span>
              <span>{counter.sec}</span>
            </div>
            {!loading ? (
              <div className="button" onClick={() => toggle()}>
                <PlayButton playing={playing} />
              </div>
            ) : (
              <div className="button loading">
                <LoadingButton />
              </div>
            )}
            <div
              className="radio"
              /*style={{
                backgroundImage: `url(${process.env.REACT_APP_IMG_PATH}${logo})`
              }}*/
            >
              <img
                src={`${process.env.REACT_APP_IMG_PATH}${logo}`}
                alt="logo"
              />
            </div>
          </div>
          <div className="audio-volume">
            <span>Volume </span>
            <input
              className="volume"
              type="range"
              min="0"
              max="1"
              value={volume}
              onChange={(e) => {
                setVolume(e.target.value);
                changeVolume();
              }}
              step="0.01"
            />
            <FontAwesomeIcon icon={faVolumeHigh} />
          </div>
          {error !== "" ? (
            <div className="error">
              <span>{error}</span>
            </div>
          ) : null}
          <div className="second">
            <div
              className={`${
                radioList ? "radio-list" : "radio-list radio-list-off"
              }`}
            >
              {stations.map((radio, i) => {
                return (
                  <div key={i} className="radio-container">
                    <div>
                      <img
                        src={`${process.env.REACT_APP_IMG_PATH}`}
                        alt="flag"
                      />
                    </div>
                    <div>
                      <span
                        onClick={
                          radioList ? () => switchRadio(radio) : () => null
                        }
                        className="radio-name"
                      >
                        {radio.name}
                      </span>
                      <div className="radio-infos">
                        <span>{radio.countryCode}</span>
                        <span> - </span>
                        <span>{radio.country}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
