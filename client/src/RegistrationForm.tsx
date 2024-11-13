import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from './UserContext';

/**
 * Form that registers a user.
 */
export function RegistrationForm() {
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
      const res = await fetch('/api/auth/sign-up', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const user = (await res.json()) as User;
      console.log('Registered', user);
      console.log(
        `You can check the database with: psql -d userManagement -c 'select * from users'`
      );
      alert(
        `Successfully registered ${user.username} as userId ${user.userId}.`
      );
      navigate('/sign-in');
    } catch (err) {
      alert(`Error registering user: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="signInContainer">
      <div className="signInBox">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap mb-1">
            <div className="w-1/2">
              <label className="mb-1 block">
                <input
                  required
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="registerInput"
                />
              </label>
              <label className="mb-1 block">
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
