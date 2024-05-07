import { chatApi, GetChatRequestProps, GetChatsRequestProps } from '@/shared/api/chat-api';
import { useQuery } from '@tanstack/react-query';

export const useGetChats = (props: GetChatsRequestProps) => {
  return useQuery({
    queryKey: [props.chatOwnerId.toString()],
    queryFn: async () => await chatApi.getChats(props),
  });
};

export const useGetChat = (props: GetChatRequestProps) => {
  return useQuery({
    queryKey: [props.id.toString()],
    queryFn: async () => await chatApi.getChat(props),
  });
};
