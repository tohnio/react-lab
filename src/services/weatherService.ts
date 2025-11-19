import { ApiService } from './api';
import type { Weather } from '../types';

/**
 * OpenWeather API response interface
 */
interface OpenWeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
  }>;
  name: string;
}

/**
 * Service for interacting with OpenWeather API
 */
class WeatherService {
  private api: ApiService;
  private apiKey: string;

  constructor() {
    // Get API key from environment variable
    this.apiKey = import.meta.env.VITE_WEATHER_API_KEY || '';
    this.api = new ApiService('https://api.openweathermap.org/data/2.5');
  }

  /**
   * Get current weather for a city
   */
  async getCurrentWeather(city: string): Promise<Weather> {
    if (!this.apiKey) {
      throw new Error('OpenWeather API key is not configured. Please set VITE_WEATHER_API_KEY in your .env file.');
    }

    if (!city || city.trim().length === 0) {
      throw new Error('City name is required');
    }

    try {
      const response = await this.api.get<OpenWeatherResponse>(
        `/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`,
        true // Use cache
      );

      // Transform API response to our Weather interface
      return {
        temp: Math.round(response.main.temp),
        description: response.weather[0]?.description || 'No description',
        humidity: response.main.humidity,
        city: response.name,
      };
    } catch (error) {
      if (error instanceof Error) {
        // Provide more specific error messages
        if (error.message.includes('404')) {
          throw new Error(`City "${city}" not found. Please check the spelling.`);
        }
        throw error;
      }
      throw new Error('Failed to fetch weather data');
    }
  }

  /**
   * Get weather by coordinates
   */
  async getWeatherByCoordinates(lat: number, lon: number): Promise<Weather> {
    if (!this.apiKey) {
      throw new Error('OpenWeather API key is not configured. Please set VITE_WEATHER_API_KEY in your .env file.');
    }

    try {
      const response = await this.api.get<OpenWeatherResponse>(
        `/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`,
        true
      );

      return {
        temp: Math.round(response.main.temp),
        description: response.weather[0]?.description || 'No description',
        humidity: response.main.humidity,
        city: response.name,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch weather data');
    }
  }

  /**
   * Clear the weather cache
   */
  clearCache(): void {
    this.api.clearCache();
  }
}

// Export singleton instance
export const weatherService = new WeatherService();
