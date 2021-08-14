import {
  BasePlayerCallback,
  INoteSequence,
  PianoRollSVGVisualizer,
  Player,
} from "@magenta/music";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDeepEffect } from "./useDeep";

function useMagentaPlayer(
  callbacks: MutableRefObject<BasePlayerCallback>,
  track?: INoteSequence
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [play, setPlay] = useState(false);
  const player = useRef<null | Player>(null);
  useEffect(() => {
    (async () => {
      const { Player } = await import("@magenta/music");
      player.current = new Player(false, callbacks.current);
      if (track) {
        player.current.start(track);
        player.current.pause();
      }
    })();
  }, []);

  useDeepEffect(() => {
    if (play) {
      setPlay(false);
    }
    player.current?.stop();
    if (track) {
      player.current?.start(track);
      player.current?.pause();
    }
  }, [track]);

  useEffect(() => {
    if (play) {
      const state = player.current?.getPlayState();
      if (state == "stopped") {
        player.current?.start(track);
        player.current?.seekTo(0);
      } else if (state == "paused") {
        player.current?.resume();
      }
    } else if (player.current && player.current.isPlaying()) {
      player.current?.pause();
    }
  }, [play]);

  return [play, setPlay];
}

export default useMagentaPlayer;
