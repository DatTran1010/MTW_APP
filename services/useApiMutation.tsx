import {useDispatch} from 'react-redux';
import {useMutation} from '@tanstack/react-query';
import {setOverlay} from '../src/Redux/AppSlice';

const useApiMutation = (
  mutationKey: any,
  mutationFn: (params: any) => Promise<any>,
  enabled: boolean = true,
) => {
  const dispatch = useDispatch();

  const mutation = useMutation(
    async params => {
      dispatch(setOverlay(true)); // Set isLoading to true before making the API call
      try {
        const result = await mutationFn(params);
        return result; // Ensure that you return a value from mutationFn
      } catch (error) {
        throw error;
      } finally {
        dispatch(setOverlay(false)); // Set isLoading to false after the API call is complete
      }
    },
    {
      enabled: enabled,
    },
  );

  return mutation;
};

export default useApiMutation;
