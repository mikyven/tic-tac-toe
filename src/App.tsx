import { ReactElement, useState, useRef } from 'react';
import { useTimeout } from 'react-use';
import './styles/App.css';
import { Tile } from './components/Tile';

export function App(): ReactElement {
  const keysArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [isGameStopped, setIsGameStopped] = useState<boolean>(false);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [move, setMove] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingAgain, setIsPlayingAgain] = useState(false);
  const [headerContent, setHeaderContent] = useState<string>('Tic-Tac-Toe');
  const [showEndScreen, setShowEndScreen] = useState<boolean>(false);
  const [isReady, , reset] = useTimeout(1000);
  const horizontalLinesRef = useRef<HTMLDivElement | null>(null);
  const verticalLinesRef = useRef<HTMLDivElement | null>(null);

  const getTurn = (funcMove: number): string =>
    funcMove % 2 === 0 ? 'X' : 'O';

  const onTileClick = (i: number): void => {
    if (!tiles[i]) {
      const nextTiles = tiles.slice();
      nextTiles[i] = getTurn(move);
      setTiles(nextTiles);
      setMove(move + 1);
      setHeaderContent(`${getTurn(move + 1)}'s turn`);
    }
  };
  const onEndOfGame = (): void => {
    setIsGameStopped(false);
    setIsPlaying(false);
    setIsDraw(false);
    setTiles(Array(9).fill(null));
    setMove(getTurn(move) === 'X' ? 1 : 0);
    horizontalLinesRef?.current?.classList.remove('horizontal');
    verticalLinesRef?.current?.classList.remove('vertical');
  };

  if (!isGameStopped) {
    if (
      [tiles[0], tiles[1], tiles[2]].every((i) => i && i === tiles[0]) ||
      [tiles[3], tiles[4], tiles[5]].every((i) => i && i === tiles[3]) ||
      [tiles[6], tiles[7], tiles[8]].every((i) => i && i === tiles[6]) ||
      [tiles[0], tiles[3], tiles[6]].every((i) => i && i === tiles[0]) ||
      [tiles[1], tiles[4], tiles[7]].every((i) => i && i === tiles[1]) ||
      [tiles[2], tiles[5], tiles[8]].every((i) => i && i === tiles[2]) ||
      [tiles[0], tiles[4], tiles[8]].every((i) => i && i === tiles[0]) ||
      [tiles[2], tiles[4], tiles[6]].every((i) => i && i === tiles[2])
    ) {
      setIsGameStopped(true);
      setShowEndScreen(true);
    } else if (tiles.every((i) => i) && !isDraw) {
      setIsDraw(true);
      setHeaderContent('Draw');
      setShowEndScreen(true);
    }
  }

  return (
    <>
      <h1>{isGameStopped ? `${getTurn(move - 1)} wins` : headerContent}</h1>

      {!isPlaying && !isPlayingAgain && (
        <button
          className="playBtn"
          onClick={() => {
            setIsPlaying(true);
            setHeaderContent(`${getTurn(move)}'s turn`);
            reset();
          }}
        >
          Play!
        </button>
      )}

      {isPlaying && (
        <>
          {horizontalLinesRef?.current?.classList.add('horizontal')}
          {verticalLinesRef?.current?.classList.add('vertical')}

          {isReady() && (
            <div className="tiles">
              {tiles.map((_i, index) => (
                <Tile
                  key={keysArr[index]}
                  value={tiles[index]}
                  onTileClick={
                    isGameStopped || isDraw
                      ? (): void => onEndOfGame()
                      : (): void => onTileClick(index)
                  }
                />
              ))}
            </div>
          )}
          <div className="horizontal lines" ref={horizontalLinesRef}>
            <div className="line" />
            <div className="line" />
          </div>
          <div className="vertical lines" ref={verticalLinesRef}>
            <div className="line" />
            <div className="line" />
          </div>
        </>
      )}

      {showEndScreen && (
        <div className="endScreen">
          <button
            className="playBtn endScreenPlayBtn"
            onClick={() => {
              onEndOfGame();
              setIsPlayingAgain(true);
              setHeaderContent(`${getTurn(move + 1)}'s turn`);
              setShowEndScreen(false);
              reset();
              setTimeout(() => setIsPlaying(true), 1);
            }}
          >
            Play again!
          </button>
          <button
            className="exitBtn"
            onClick={() => {
              onEndOfGame();
              setIsPlaying(false);
              setIsPlayingAgain(false);
              setHeaderContent('Tic-Tac-Toe');
              setShowEndScreen(false);
              reset();
            }}
          >
            Exit
          </button>
        </div>
      )}
    </>
  );
}
