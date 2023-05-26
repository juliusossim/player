import { useEffect } from "react";

type StreamErrorProps = {
    handleError: () => void,
    audio: { [key: string]: string | any },
    playing: boolean,
    setPlaying: (playing: boolean) => void,
    setLoading: (loading: boolean) => void
}
export const useStreamFail = ({ handleError, audio, playing, setPlaying, setLoading }: StreamErrorProps) => {
      // Play effects
  useEffect(() => {
    // Play or pause from playing state
    if (playing) {
      setTimeout(() => {
        let promise = audio.current.play();

        if (promise !== null) {
          promise
            .then(() => {
              // Reinititialze if the stream is not read after a lap of time
              setTimeout(() => {
                if (audio.current.currentTime === 0) {
                  handleError();

                  setTimeout(() => {
                    window.location.reload();
                  }, 3000);
                }
              }, 10000);

              setPlaying(playing);
              setLoading(false);
            })
            .catch((err: Error) => {
                console.log(err)
             handleError()

              // Display message during 5s
              setTimeout(() => {
                // Reload page
                window.location.reload();
              }, 5000);
            });
        }
      }, 500);
    } else {
      audio.current.pause();
    }
  }, [audio, playing]);

}