import { ApiService } from './api';
import type { Post } from '../types';

/**
 * Service for interacting with JSONPlaceholder Posts API
 */
class PostsService {
  private api: ApiService;

  constructor() {
    this.api = new ApiService('https://jsonplaceholder.typicode.com');
  }

  /**
   * Get all posts
   */
  async getPosts(): Promise<Post[]> {
    return this.api.get<Post[]>('/posts');
  }

  /**
   * Get a single post by ID
   */
  async getPost(id: number): Promise<Post> {
    return this.api.get<Post>(`/posts/${id}`);
  }

  /**
   * Create a new post
   */
  async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    return this.api.post<Post>('/posts', post);
  }

  /**
   * Update an existing post (full update)
   */
  async updatePost(id: number, post: Omit<Post, 'id'>): Promise<Post> {
    return this.api.put<Post>(`/posts/${id}`, post);
  }

  /**
   * Partially update a post
   */
  async patchPost(id: number, post: Partial<Post>): Promise<Post> {
    return this.api.patch<Post>(`/posts/${id}`, post);
  }

  /**
   * Delete a post
   */
  async deletePost(id: number): Promise<void> {
    await this.api.delete(`/posts/${id}`);
  }

  /**
   * Get posts by user ID
   */
  async getPostsByUser(userId: number): Promise<Post[]> {
    return this.api.get<Post[]>(`/posts?userId=${userId}`);
  }

  /**
   * Clear the posts cache
   */
  clearCache(): void {
    this.api.clearCache();
  }
}

// Export singleton instance
export const postsService = new PostsService();
