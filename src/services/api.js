// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://drelegrambot-production-311f.up.railway.app/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Get auth headers
  getAuthHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic fetch wrapper
  async fetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // ==========================================
  // AUTHENTICATION
  // ==========================================

  async authenticateTelegram(initData) {
    const data = await this.fetch('/auth/telegram', {
      method: 'POST',
      body: JSON.stringify({ initData }),
    });

    this.setToken(data.token);
    return data;
  }

  async authenticateSimple(userId, username) {
    const data = await this.fetch('/auth/simple', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, username }),
    });

    this.setToken(data.token);
    return data;
  }

  async loginWithToken(userId, token) {
    const data = await this.fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ user_id: userId, token }),
    });

    this.setToken(data.token);
    return data;
    }

    async authenticateTelegramPayment(initData) {
    const data = await this.fetch('/auth/telegram-payment', {
        method: 'POST',
        body: JSON.stringify({ initData }),
    });

    this.setToken(data.token);
    return data;
    }

  // ==========================================
  // USER ENDPOINTS
  // ==========================================

  async getCurrentUser() {
    return await this.fetch('/user/me');
  }

  async getUserSubscription() {
    return await this.fetch('/user/subscription');
  }

  async getUserTransactions(limit = 50) {
    return await this.fetch(`/user/transactions?limit=${limit}`);
  }

  async getUserNotifications(unreadOnly = false) {
    return await this.fetch(`/user/notifications?unread_only=${unreadOnly}`);
  }

  async markNotificationRead(notificationId) {
    return await this.fetch(`/user/notifications/${notificationId}/read`, {
      method: 'POST',
    });
  }

  async getUserWallet() {
    return await this.fetch('/user/wallet');
  }

  // ==========================================
  // PAYMENT
  // ==========================================

  async createPayment(plan, cryptoCurrency = 'USDT') {
    return await this.fetch('/payment/create', {
      method: 'POST',
      body: JSON.stringify({ plan, crypto_currency: cryptoCurrency }),
    });
  }

  async getPaymentRequest(paymentId) {
    return await this.fetch(`/payment/${paymentId}`);
  }

  async getCryptoOptions(paymentId) {
    return await this.fetch(`/payment/${paymentId}/crypto-options`);
  }

  // 2. Confirm Payment to Update DB
  async confirmPayment(paymentId, status, txHash = null) {
    return await this.fetch('/payment/confirm', {
      method: 'POST',
      body: JSON.stringify({ 
        payment_id: paymentId, 
        status: status, 
        tx_hash: txHash 
      }),
    });
  }

  // ==========================================
  // HEALTH CHECK
  // ==========================================

  async healthCheck() {
    return await this.fetch('/health');
  }
  
}

export default new ApiService();
