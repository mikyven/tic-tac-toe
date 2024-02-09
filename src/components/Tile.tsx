import { ReactElement } from 'react';
import '../styles/Tile.css';

export function Tile(props: {
  value: string | null;
  onTileClick: () => void | void;
}): ReactElement {
  const { value, onTileClick } = props;
  let imgName: string | null = null;

  if (value) imgName = value === 'X' ? 'cross' : 'circle';

  return (
    <div className="tile" onClick={() => onTileClick()}>
      {imgName && (
        <img className="tileImg" src={`src/images/${imgName}.svg`} alt="" />
      )}
    </div>
  );
}
