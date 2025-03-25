import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://fivefood.shop/api/';

if (!API_BASE_URL) {
  console.error('LỖI: API_BASE_URL không được thiết lập trong .env!');
}

export const fetchTeacherListAPI = async (page = 1, pageSize = 10, sortColumn = 'Id', sortOrder = 'asc') => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://fivefood.shop/api';

  const token = localStorage.getItem('token');

  const response = await axios.get(`${API_BASE_URL}/teacherlists`, {
    params: { page, pageSize, sortColumn, sortOrder },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.data;
};
export const deleteTeacherAPI = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}teaching-assignments/${id}`);
  return response.data;
};
