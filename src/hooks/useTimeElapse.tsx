import { useEffect, useRef } from "react";

type TimeElapseProps = {
    playing: boolean;
    audio: { [key: string]: string | any };
    setCounter: (timeObj: { [key: string]: string }) => void;
}
export const useTimeElapse = ({ playing, audio, setCounter }: TimeElapseProps) => {
    let intervalRef: any = useRef<HTMLDivElement>(null);

    const increaseDate = () => {
            if (playing) {
              // Format seconds
              const result = new Date(audio.current.currentTime * 1000)
                .toISOString()
                .slice(11, 19)
                .split(':');
      
              // Object
              const formatedResults = { sec: result[2], min: result[1], hour: result[0] };
      
              // Set state counter
              setCounter(formatedResults);
      
              return formatedResults;
            }
          };


      useEffect(() => {    
        // Run fnct every seconds
        intervalRef.current = setInterval(() => {
          increaseDate();
        }, 1000);
    
        return () => clearInterval(intervalRef.current);
      }, [playing]);
    
}