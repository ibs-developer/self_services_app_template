import { TIr_Attchment } from '@/types/attachment';
import api from './axiosConfig';

import ENDPOINTS from '@/constants/ENDPOINTS';

export function apiUploadAttachment(attachment: Partial<TIr_Attchment>) {
  return api({
    method: 'POST',
    url: ENDPOINTS.ir.attachment.create,
    data: attachment,
  });
}
