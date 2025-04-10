import createAxiosInstance from '../../../../../utils/axiosInstance';

export interface UserListItem {
  id: number;
  name: string;
  email: string;
  userGroup: string;
  status: string;
}

export const fetchUserList = async (
  page: number,
  pageSize: number,
  search: string,
  sortColumn: string = 'id',
  sortOrder: 'asc' | 'desc' = 'asc',
): Promise<UserListItem[]> => {
  const axiosInstance = createAxiosInstance();
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      console.log(`Attempt ${attempt + 1}: Fetching user list...`);
      const params: any = { page, pageSize, sortColumn, sortOrder };
      if (search.trim().length > 0) {
        params.search = search;
      }

      console.log('Request Parameters:', params);
      const response = await axiosInstance.get('https://fivefood.shop/api/users', { params });
      console.log('API Response:', response.data);
      return response.data.data.map((user: any) => ({
        id: user.id,
        name: user.fullName,
        email: user.email,
        userGroup: user.roleName,
        status: user.active ? 'Active' : 'Inactive',
      }));
    } catch (error: any) {
      attempt++;
      if (attempt >= maxRetries) {
        if (error.response) {
          console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
          console.error('No response received from server:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
        throw error;
      }
      console.warn(`Retrying... (${attempt}/${maxRetries})`);
    }
  }

  return [];
};

export default fetchUserList;
