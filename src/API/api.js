const API_ENDPOINT =
  'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev';

const request = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (e) {
    throw {
      message: e.message,
      status: e.status,
    };
  }
};

export const api = {
  fetchCats: async (keyword) => {
    const data = await request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
    return data;
  },
  fetchCat: async (id) => {
    const data = await request(`${API_ENDPOINT}/api/cats/${id}`);
    return data;
  },
};
