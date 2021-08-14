import useMagentaPlayer from "hooks/useMagentaPlayer";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Flex, Heading, SxProp } from "theme-ui";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";

declare module "react" {
  interface Attributes extends SxProp {}
}

const SONG = {
  notes: [
    { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: false },
    { pitch: 38, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: false },
    { pitch: 42, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: false },
    { pitch: 46, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: false },
    { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: false },
    { pitch: 42, quantizedStartStep: 3, quantizedEndStep: 4, isDrum: false },
    { pitch: 42, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: false },
    { pitch: 50, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: false },
    { pitch: 36, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: false },
    { pitch: 38, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: false },
    { pitch: 42, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: false },
    { pitch: 45, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: false },
    { pitch: 36, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: false },
    { pitch: 42, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: false },
    { pitch: 46, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: false },
    { pitch: 42, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: false },
    { pitch: 48, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: false },
    { pitch: 50, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: false },
  ],
  quantizationInfo: { stepsPerQuarter: 4 },
  tempos: [{ time: 0, qpm: 120 }],
  totalQuantizedSteps: 11,
};

const SONG2 = {
  notes: [
    { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: false },
    { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: false },
    { pitch: 42, quantizedStartStep: 3, quantizedEndStep: 4, isDrum: false },
    { pitch: 50, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: false },
    { pitch: 42, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: false },
    { pitch: 48, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: false },
    { pitch: 30, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: false },
  ],
  quantizationInfo: { stepsPerQuarter: 4 },
  tempos: [{ time: 0, qpm: 120 }],
  totalQuantizedSteps: 11,
};

function Generate() {
  const callback = useRef({
    run: () => {},
    stop: () => {},
  });
  const [track, setTrack] = useState(SONG);
  const [playing, setPlaying] = useMagentaPlayer(callback, track);
  useEffect(() => {
    callback.current.stop = () => {
      setPlaying(false);
    };
  }, []);
  const togglePlaying = useCallback(() => {
    setPlaying((playing) => !playing);
  }, []);
  return (
    <div sx={{ m: 3 }}>
      <Heading as="h1" sx={{ mb: 2, fontSize: 6 }}>
        Generate
      </Heading>
      <Flex>
        <Button variant="outline" mr={2} onClick={togglePlaying}>
          {playing ? "Stop" : "Play"}
        </Button>
        <Button variant="outline" onClick={() => setTrack(SONG2)}>
          Switch Track
        </Button>
      </Flex>
    </div>
  );
}

export default Generate;
