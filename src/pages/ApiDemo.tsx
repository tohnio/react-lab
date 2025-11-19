import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { postsService } from '../services/postsService';
import { weatherService } from '../services/weatherService';
import type { Post, Weather } from '../types';
import styles from './ApiDemo.module.css';

/**
 * ApiDemo page - Demonstra integração com APIs públicas
 */
function ApiDemo() {
  // Posts state
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState<string>('');

  // Weather state
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string>('');

  // Load posts
  const loadPosts = async () => {
    setPostsLoading(true);
    setPostsError('');
    try {
      const data = await postsService.getPosts();
      setPosts(data.slice(0, 10)); // Limit to 10 posts
    } catch (error) {
      setPostsError(error instanceof Error ? error.message : 'Failed to load posts');
    } finally {
      setPostsLoading(false);
    }
  };

  // Delete post
  const deletePost = async (id: number) => {
    try {
      await postsService.deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      alert('Failed to delete post: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  // Search weather
  const searchWeather = async () => {
    if (!city.trim()) {
      setWeatherError('Please enter a city name');
      return;
    }

    setWeatherLoading(true);
    setWeatherError('');
    setWeather(null);

    try {
      const data = await weatherService.getCurrentWeather(city);
      setWeather(data);
    } catch (error) {
      setWeatherError(error instanceof Error ? error.message : 'Failed to fetch weather data');
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleWeatherKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchWeather();
    }
  };

  return (
    <div className={styles.apiDemo}>
      <header className={styles.header}>
        <Link to="/">
          <Button variant="secondary" size="sm">
            ← Voltar
          </Button>
        </Link>
        <h1>API Demo</h1>
        <p>Integração com APIs públicas (JSONPlaceholder e OpenWeather)</p>
      </header>

      <section className={styles.section}>
        <Card title="📝 JSONPlaceholder API - Posts">
          <p className={styles.description}>
            Demonstração de integração com a API JSONPlaceholder para listar posts.
          </p>

          <div className={styles.actions}>
            <Button onClick={loadPosts} disabled={postsLoading}>
              {postsLoading ? 'Carregando...' : 'Carregar Posts'}
            </Button>
            {posts.length > 0 && (
              <Button
                variant="secondary"
                onClick={() => {
                  setPosts([]);
                  postsService.clearCache();
                }}
              >
                Limpar
              </Button>
            )}
          </div>

          {postsLoading && (
            <div className={styles.loadingContainer}>
              <Loading text="Carregando posts..." />
            </div>
          )}

          {postsError && (
            <div className={styles.error}>
              <p>❌ {postsError}</p>
              <Button onClick={loadPosts} size="sm">
                Tentar novamente
              </Button>
            </div>
          )}

          {posts.length > 0 && !postsLoading && (
            <div className={styles.postsList}>
              <p className={styles.resultsCount}>
                Mostrando {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              </p>
              {posts.map((post) => (
                <div key={post.id} className={styles.postCard}>
                  <div className={styles.postHeader}>
                    <span className={styles.postId}>#{post.id}</span>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deletePost(post.id)}
                      aria-label={`Delete post ${post.id}`}
                    >
                      🗑️
                    </button>
                  </div>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postBody}>{post.body}</p>
                  <div className={styles.postFooter}>
                    <span className={styles.userId}>User ID: {post.userId}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {posts.length === 0 && !postsLoading && !postsError && (
            <div className={styles.emptyState}>
              <p>Clique no botão acima para carregar posts da API</p>
            </div>
          )}
        </Card>
      </section>

      <section className={styles.section}>
        <Card title="🌤️ OpenWeather API - Weather Search">
          <p className={styles.description}>
            Busque informações meteorológicas de qualquer cidade do mundo.
          </p>

          <div className={styles.weatherSearch}>
            <div className={styles.searchInputGroup}>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleWeatherKeyPress}
                placeholder="Digite o nome da cidade (ex: London, Tokyo, São Paulo)"
                className={styles.input}
              />
              <Button onClick={searchWeather} disabled={weatherLoading || !city.trim()}>
                {weatherLoading ? 'Buscando...' : '🔍 Buscar'}
              </Button>
            </div>
          </div>

          {weatherLoading && (
            <div className={styles.loadingContainer}>
              <Loading text="Buscando dados meteorológicos..." />
            </div>
          )}

          {weatherError && (
            <div className={styles.error}>
              <p>❌ {weatherError}</p>
              {weatherError.includes('API key') && (
                <p className={styles.hint}>
                  💡 Configure a variável VITE_WEATHER_API_KEY no arquivo .env
                </p>
              )}
            </div>
          )}

          {weather && !weatherLoading && (
            <div className={styles.weatherCard}>
              <div className={styles.weatherHeader}>
                <h3>{weather.city}</h3>
                <span className={styles.weatherIcon}>
                  {weather.temp > 25 ? '☀️' : weather.temp > 15 ? '⛅' : '🌧️'}
                </span>
              </div>
              <div className={styles.weatherDetails}>
                <div className={styles.weatherItem}>
                  <span className={styles.weatherLabel}>Temperatura:</span>
                  <span className={styles.weatherValue}>{weather.temp}°C</span>
                </div>
                <div className={styles.weatherItem}>
                  <span className={styles.weatherLabel}>Descrição:</span>
                  <span className={styles.weatherValue}>{weather.description}</span>
                </div>
                <div className={styles.weatherItem}>
                  <span className={styles.weatherLabel}>Umidade:</span>
                  <span className={styles.weatherValue}>{weather.humidity}%</span>
                </div>
              </div>
            </div>
          )}

          {!weather && !weatherLoading && !weatherError && (
            <div className={styles.emptyState}>
              <p>Digite o nome de uma cidade e clique em buscar</p>
            </div>
          )}
        </Card>
      </section>

      <section className={styles.infoSection}>
        <Card title="💡 Recursos Implementados">
          <ul>
            <li>✅ Requisições HTTP com axios através de serviços dedicados</li>
            <li>✅ Cache de respostas para melhorar performance</li>
            <li>✅ Estados de loading durante requisições</li>
            <li>✅ Tratamento de erros com mensagens user-friendly</li>
            <li>✅ Operações CRUD (Create, Read, Update, Delete)</li>
            <li>✅ Integração com múltiplas APIs públicas</li>
            <li>✅ Feedback visual para todas as operações</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}

export default ApiDemo;
