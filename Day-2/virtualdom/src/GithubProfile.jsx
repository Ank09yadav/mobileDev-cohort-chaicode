import { useEffect, useState } from 'react';
import './GithubProfile.css';

const GithubProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('https://api.github.com/users/Ank09yadav');
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <main className="github-page">
        <section className="profile-card profile-center">
          <p className="status-text">Loading profile...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="github-page">
        <section className="profile-card profile-center">
          <p className="status-text error-text">{error}</p>
          <button className="refresh-btn" onClick={fetchData} type="button">
            Try Again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="github-page">
      <section className="profile-card">
        <img
          className="avatar"
          src={profile.avatar_url}
          alt={`${profile.name || profile.login} avatar`}
        />

        <h1 className="name">{profile.name || profile.login}</h1>
        <p className="username">@{profile.login}</p>
        <p className="bio">{profile.bio || 'Building cool things with code.'}</p>

        <div className="stats-grid">
          <article className="stat-item">
            <p className="stat-label">Followers</p>
            <p className="stat-value">{profile.followers}</p>
          </article>
          <article className="stat-item">
            <p className="stat-label">Following</p>
            <p className="stat-value">{profile.following}</p>
          </article>
          <article className="stat-item">
            <p className="stat-label">Repos</p>
            <p className="stat-value">{profile.public_repos}</p>
          </article>
        </div>

        <div className="meta">
          <p>{profile.location || 'Location not specified'}</p>
          <p>{profile.company || 'Independent Developer'}</p>
        </div>

        <a
          className="profile-link"
          href={profile.html_url}
          target="_blank"
          rel="noreferrer"
        >
          View GitHub Profile
        </a>
      </section>
    </main>
  );
};

export default GithubProfile;
