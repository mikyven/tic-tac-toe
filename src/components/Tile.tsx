import { ReactElement } from 'react';
import '../styles/Tile.css';
import cross from '../images/cross.png';
import circle from '../images/circle.png';

export function Tile(props: {
  value: string | null;
  onTileClick: () => void | void;
}): ReactElement {
  const { value, onTileClick } = props;

  return (
    <div className="tile" onClick={() => onTileClick()}>
      {value && (
        <img className="tileImg" src={value === 'X' ? cross : circle} alt="" />
      )}
    </div>
  );
}
