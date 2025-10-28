import api from './api';
import { NewsletterResponse } from '../types';

/**
 * Newsletter service for handling newsletter subscriptions
 */
class NewsletterService {
  /**
   * Subscribe to newsletter
   */
  async subscribe(email: string): Promise<NewsletterResponse> {
    const response = await api.post<NewsletterResponse>('/newsletter/subscribe', {
      email,
    });
    return response.data;
  }

  /**
   * Unsubscribe from newsletter
   */
  async unsubscribe(email: string): Promise<NewsletterResponse> {
    const response = await api.post<NewsletterResponse>('/newsletter/unsubscribe', {
      email,
    });
    return response.data;
  }
}

export default new NewsletterService();

