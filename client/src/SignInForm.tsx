import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, useUser } from './useUser';

type AuthData = {
  user: User;
  token: string;
};

/**
 * Form that signs in a user.
 */
export function SignInForm() {
  const { handleSignIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = (await res.json()) as AuthData;
      handleSignIn(user, token);
      navigate('/');
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="signInContainer">
      <div className="signInBox">
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label>
                <input
                  required
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="registerInput"
                />
              </label>
              <label>
                <input
                  required
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="registerInput"
                />
              </label>
            </div>
          </div>
          <button disabled={isLoading} className="signUpButton">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
