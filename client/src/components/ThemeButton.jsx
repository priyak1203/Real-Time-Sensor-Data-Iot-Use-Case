import { useGlobalContext } from '../context';
import { StarIconFilled } from './Icon';

const ThemeButton = () => {
  const { toggleTheme } = useGlobalContext();

  return (
    <button className="toggle-btn" onClick={toggleTheme}>
      <StarIconFilled />
      <span className="tooltip-text">change theme</span>
    </button>
  );
};

export default ThemeButton;
