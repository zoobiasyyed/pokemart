import { useNavigate } from 'react-router-dom';
import { useUser } from './useUser';
import { Products } from './Products';
import { Header } from './Header';

export function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="homeContainer">
      <div className="flex flex-wrap mb-4">
        {!user && (
          <>
            <div className="relative flex-grow flex-1 px-4">
              <button
                className="inline-block align-middle text-center border rounded py-1 px-3 bg-blue-600 text-white"
                onClick={() => navigate('sign-up')}>
                Sign Up
              </button>
            </div>
            <div className="relative flex-grow flex-1 px-4">
              <button
                className="inline-block align-middle text-center border rounded py-1 px-3 bg-blue-600 text-white"
                onClick={() => navigate('sign-in')}>
                Sign In
              </button>
            </div>
          </>
        )}
      </div>
      {!user && <p>Not signed in</p>}
      {user && <Header />}
      {user && <Products />}
    </div>
  );
}
