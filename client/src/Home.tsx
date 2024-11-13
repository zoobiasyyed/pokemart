import { useNavigate } from 'react-router-dom';
import { useUser } from './useUser';
import { Products } from './Products';
import { Header } from './Header';

export function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="homeContainer">
      <div className="homeButtons">
        {!user && (
          <div className="entryBox">
            <div className="entryLogo">PokeMart</div>
            <div>
              <button
                className="signUpButton"
                onClick={() => navigate('sign-up')}>
                Sign Up
              </button>
              <button
                className="signUpButton"
                onClick={() => navigate('sign-in')}>
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
      {user && <Header />}
      {user && <Products />}
    </div>
  );
}
