import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Classe base para serviços de API com cache e tratamento de erros
 *
 * Funcionalidades:
 * - Cache em memória com TTL configurável
 * - Tratamento centralizado de erros HTTP
 * - Mensagens de erro user-friendly
 * - Suporte a todos os métodos HTTP (GET, POST, PUT, PATCH, DELETE)
 *
 * @example
 * const api = new ApiService('https://api.example.com');
 * const data = await api.get<User[]>('/users');
 */
export class ApiService {
  private axiosInstance: AxiosInstance;
  /** Cache em memória: Map<cacheKey, { data, timestamp }> */
  private cache: Map<string, { data: unknown; timestamp: number }>;
  /** Tempo de vida do cache em milissegundos (padrão: 5 minutos) */
  private cacheTTL: number;

  /**
   * Cria uma nova instância do ApiService
   *
   * @param baseURL - URL base para todas as requisições
   * @param cacheTTL - Tempo de vida do cache em ms (padrão: 5 minutos)
   */
  constructor(baseURL: string, cacheTTL: number = 5 * 60 * 1000) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.cache = new Map();
    this.cacheTTL = cacheTTL;

    // Adiciona interceptor de resposta para tratamento centralizado de erros
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => this.handleError(error)
    );
  }

  /**
   * Trata erros de API e fornece mensagens user-friendly
   * Converte códigos de status HTTP em mensagens legíveis
   *
   * @param error - Erro do Axios
   * @returns Promise rejeitada com mensagem de erro apropriada
   */
  private handleError(error: AxiosError): Promise<never> {
    if (error.response) {
      // Servidor respondeu com status de erro
      const status = error.response.status;
      let message = 'An error occurred';

      // Mapeia códigos de status HTTP para mensagens user-friendly
      switch (status) {
        case 400:
          message = 'Bad request. Please check your input.';
          break;
        case 401:
          message = 'Unauthorized. Please log in.';
          break;
        case 403:
          message = 'Forbidden. You do not have permission.';
          break;
        case 404:
          message = 'Resource not found.';
          break;
        case 500:
          message = 'Server error. Please try again later.';
          break;
        default:
          message = `Error: ${status}`;
      }

      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Requisição feita mas sem resposta recebida (erro de rede)
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Erro na configuração da requisição
      return Promise.reject(new Error('Request failed. Please try again.'));
    }
  }

  /**
   * Verifica se os dados em cache ainda são válidos
   * Compara o timestamp do cache com o TTL configurado
   *
   * @param cacheKey - Chave do cache a verificar
   * @returns true se o cache é válido, false caso contrário
   */
  private isCacheValid(cacheKey: string): boolean {
    const cached = this.cache.get(cacheKey);
    if (!cached) return false;

    const now = Date.now();
    return now - cached.timestamp < this.cacheTTL;
  }

  /**
   * Requisição GET com cache opcional
   *
   * @param endpoint - Endpoint da API (relativo à baseURL)
   * @param useCache - Se deve usar cache (padrão: true)
   * @param config - Configurações adicionais do Axios
   * @returns Promise com os dados da resposta
   *
   * @example
   * const users = await api.get<User[]>('/users');
   * const freshData = await api.get<User[]>('/users', false); // Sem cache
   */
  async get<T>(endpoint: string, useCache: boolean = true, config?: AxiosRequestConfig): Promise<T> {
    const cacheKey = `GET:${endpoint}`;

    // Verifica cache se habilitado
    if (useCache && this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data as T;
    }

    const response = await this.axiosInstance.get<T>(endpoint, config);

    // Armazena no cache
    if (useCache) {
      this.cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });
    }

    return response.data;
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint, config);
    return response.data;
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Clear specific cache entry
   */
  clearCacheEntry(endpoint: string): void {
    const cacheKey = `GET:${endpoint}`;
    this.cache.delete(cacheKey);
  }
}
