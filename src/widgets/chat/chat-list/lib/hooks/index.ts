import { useQuery } from '@tanstack/react-query';
import { chatApi, GetChatsRequestProps } from '@/shared/api/chat-api';

export const useGetChats = (props: GetChatsRequestProps) => {
  return useQuery({
    queryKey: [props.chatOwnerId.toString()],
    queryFn: async () => await chatApi.getChats(props),
  });
};
