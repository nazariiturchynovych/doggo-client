import { User } from '@/entities/user';

export type Chat = {
  chatId: string;
  name: string;
  isPrivate: boolean;
  userChats: UserChat[];
  messages: Message[];
};

export type Message = {
  id: string;
  changedDate: string | null;
  createDate: string;
  userId: string;
  userName: string;
  value: string;
};

export type UserChat = {
  userId: string;
  user: User;
  chatId: string;
  chat: Chat;
};
