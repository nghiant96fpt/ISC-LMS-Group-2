import createAxiosInstance from '../../../../utils/axiosInstance';
const axiosInstance = createAxiosInstance(true);
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE_URL) {
  console.error('LỖI: API_BASE_URL không được thiết lập trong .env!');
}

export const fetchTeacherListAPI = async (page = 1, pageSize = 10, sortColumn = 'Id', sortOrder = 'asc', search = '') => {
  const response = await axiosInstance.get(`${API_BASE_URL}/teacherlists`, {
    params: { page, pageSize, sortColumn, sortOrder, search },
  });

  return response.data;
};
export const deleteTeacherAPI = async (id: number) => {
  const response = await axiosInstance.delete(`${API_BASE_URL}/teaching-assignments/${id}`);
  return response.data;
};
