import { useGlobalContext } from '../context';
import { StarIconFilled } from './Icon';

const ThemeButton = () => {
  const { toggleTheme } = useGlobalContext();

  return (
    <button className="toggle-btn" onClick={toggleTheme}>
      <StarIconFilled />
    </button>
  );
};

export default ThemeButton;
