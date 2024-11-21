import { useNavigate } from 'react-router-dom';
import { useUser } from './useUser';
import { Products } from './Products';
import { Header } from './Header';

/**
 * Renders the Home component, serving as the main landing page for the application.
 *
 * @returns {JSX.Element}
 */

export function Home() {
  const { user, handleSignIn } = useUser();
  const navigate = useNavigate();

  async function handleGuest() {
    try {
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'guest', password: 'guest' }),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = await res.json();
      handleSignIn(user, token);
    } catch (err) {
      console.error(err);
      alert('error signing in');
    }
  }

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
            <div>
              <button className="guestButton" onClick={handleGuest}>
                Sign in as Guest
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
