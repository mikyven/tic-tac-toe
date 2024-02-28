import { ReactElement } from 'react';
import '../styles/Tile.scss';
import cross from '../images/cross.png';
import circle from '../images/circle.png';

export function Tile(props: {
  value: string | null;
  onTileClick: () => void;
}): ReactElement {
  const { value, onTileClick } = props;

  return (
    <div className="tile" onClick={() => onTileClick()}>
      {value && (
        <img className="icon" src={value === 'X' ? cross : circle} alt="" />
      )}
    </div>
  );
}
