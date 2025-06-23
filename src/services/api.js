const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

// Public GET
const getData = (endpoint) => {
  return fetch(`${BASE_URL}${endpoint}`)
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch data');
      return res.json();
    });
};

// Protected GET
const getProtectedData = (endpoint) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  return fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error('Unauthorized');
      return res.json();
    });
};

// Protected POST
const postData = (endpoint, data) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  return fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to post data');
      return res.json();
    });
};

// Protected PUT
const putData = (endpoint, data) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  return fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to update');
      return res.json();
    });
};

// Protected DELETE
const deleteData = (endpoint) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  return fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    });
};

// Export all at the end
export {
  getData,
  getProtectedData,
  postData,
  putData,
  deleteData
};
