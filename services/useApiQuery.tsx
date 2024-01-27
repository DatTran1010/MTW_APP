import {useDispatch} from 'react-redux';
import {useQuery, useMutation} from '@tanstack/react-query';
import {setOverlay} from '../src/Redux/AppSlice';

const useApiQuery = (
  queryKey: any,
  queryFn: () => Promise<any>,
  enabled: any = false,
) => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      dispatch(setOverlay(true)); // Set isLoading to true before making the API call
      try {
        const result = await queryFn();
        return result; // Đảm bảo rằng bạn trả về giá trị từ queryFn
      } catch (error) {
        throw error;
      } finally {
        dispatch(setOverlay(false)); // Set isLoading to false after the API call is complete
      }
    },
    enabled: enabled,
  });

  return query;
};

export default useApiQuery;
