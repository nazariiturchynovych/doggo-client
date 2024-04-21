import { useQuery } from '@tanstack/react-query';
import { chatApi, GetChatRequestProps } from '@/shared/api/chat-api';

export const useGetChat = (props: GetChatRequestProps) => {
  return useQuery({
    queryKey: [props.id.toString()],
    queryFn: async () => await chatApi.getChat(props),
  });
};
