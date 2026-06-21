const API_BASE_URL = 'http://localhost:5050/api';

// Helper for fetching
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('shc_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error(`API Error in ${endpoint}:`, error.message);
    throw error;
  }
};

export const authAPI = {
  register: (userData) => request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  login: (credentials) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  getMe: () => request('/auth/me')
};

export const incidentAPI = {
  getIncidents: (userOnly = false) => request(`/incidents?userOnly=${userOnly}`),
  createIncident: (incidentData) => request('/incidents', {
    method: 'POST',
    body: JSON.stringify(incidentData)
  }),
  updateIncidentStatus: (id, status, adminNotes = '') => request(`/incidents/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, adminNotes })
  }),
  getStats: () => request('/incidents/stats')
};

export const aiAPI = {
  chatWithAi: (message) => request('/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message })
  })
};
