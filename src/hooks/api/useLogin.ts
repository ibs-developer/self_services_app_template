import { useMutation } from '@tanstack/react-query';
import { apiEmployeeLogin, apiLogin, apiLogout } from '@/lib/api/apiLogin';
import { useLoginStore } from '../loginStore';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { TloginForm } from '@/types/global';
import onError from './error';

export function useLogin() {
  const { setUser } = useLoginStore();
  const mutation = useMutation({
    mutationFn: async (payload: TloginForm) => {
      // Step 1: Admin login to get access token
      const adminResponse = await apiLogin();
      const accessToken = adminResponse.data.data.access_token;

      if (!accessToken) {
        console.error('No access token received');
        throw new Error('No access token received');
      }

      // Step 2: Employee login using the access token
      const employeeResponse = await apiEmployeeLogin(payload, accessToken);


      if (!employeeResponse.data) {
        throw new Error('No employee data received');
      }

      if (Object.keys(employeeResponse.data).length === 0) {
        throw new Error('No employee found with the provided credentials');
      }

      const employee = employeeResponse.data.data;

      setUser({ access_token: accessToken, id: employee.employee_id });

      // Step 3: Return the employee data
      return employeeResponse.data;
    },
    onError: (error: any) => {
      if (error.response.status && error.response.status === 403) {
        if (error.response.data.error.type === 'device_mismatch')
          console.log("not your device", error.response.data.error.message)
        router.push('/login/device_mismatch');
      }
      // onError(error);
      // Optionally, you can handle specific error cases here
      // For example, if you want to redirect to a specific error page:
      // if (error.message.includes('device mismatch')) {
      //   router.push('/device-mismatch');
      // }
    },
    onSuccess: () => {
      router.push('/(tabs)');
      Toast.show({
        type: 'success',
        text1: 'Login successful',
      });
    },
  });

  const { mutate } = mutation;

  return { doLogin: mutate, ...mutation };
}

export function useLogout() {
  const { user, resetUser } = useLoginStore();
  const mutation = useMutation({
    mutationFn: apiLogout,
    onError,
    onSuccess: async () => {
      // Reset user state
      await resetUser();
      // Handle success
      Toast.show({
        type: 'success',
        text1: 'Logout successful',
      });

    },
  });

  const { mutate } = mutation;

  return { doLogout: mutate, ...mutation };
}
