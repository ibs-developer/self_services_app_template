import { useMutation, useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { apiUploadAttachment } from '@/lib/api/ir.attachment.api';
import onError from './error';
import { TIr_Attchment } from '@/types/attachment';

export function useUploadAttachment() {
  const mutation = useMutation({
    mutationFn: (payload: Partial<TIr_Attchment>) => {
      return apiUploadAttachment(payload);
    },

    onSuccess: (data) => {
      // Handle success
      Toast.show({
        type: 'success',
        text1: 'Create success',
      });
    },
    onError,
  });

  const { mutate } = mutation;

  return { doUploadDocument: mutate, ...mutation };
}
