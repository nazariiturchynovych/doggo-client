import { BaseResponse, BaseResponseWithData } from '@/shared/api/result';
import $api from '@/shared/lib/config/axios.ts';
import {
  AddUsersToChat,
  CreateChatRequestProps,
  CreateGroupChatRequestProps,
  DeleteChatRequestProps,
  DeleteUsersFromChat,
  GetChatRequestProps,
  GetChatsRequestProps,
  GetPageOfChatsRequestProps,
  UpdateChatRequestProps,
} from '@/shared/api/chat-api/models/requests.ts';
import { Chat } from '@/entities/chat/model/models.ts';

export interface ChatApiService {
  createChat: (props: CreateChatRequestProps) => Promise<BaseResponse>;
  createGroupChat: (props: CreateGroupChatRequestProps) => Promise<BaseResponse>;
  getChat: (props: GetChatRequestProps) => Promise<BaseResponseWithData<Chat>>;
  getChats: (props: GetChatsRequestProps) => Promise<BaseResponseWithData<Chat[]>>;
  getPageOfChats: (props: GetPageOfChatsRequestProps) => Promise<BaseResponseWithData<Chat[]>>;
  addUsersToChat: (props: AddUsersToChat) => Promise<BaseResponse>;
  deleteUsersToChat: (props: DeleteUsersFromChat) => Promise<BaseResponse>;
  updateChat: (props: UpdateChatRequestProps) => Promise<BaseResponse>;
  deleteChat: (props: DeleteChatRequestProps) => Promise<BaseResponse>;
}

export class ChatApi implements ChatApiService {
  async createChat(props: CreateChatRequestProps) {
    const query = '/Chat/chat';
    const { data } = await $api.post<BaseResponse>(query, props);
    return data;
  }

  async createGroupChat(props: CreateGroupChatRequestProps) {
    const query = '/Chat/chat/group';
    const { data } = await $api.post<BaseResponse>(query, props);
    return data;
  }

  async getChat(props: GetChatRequestProps) {
    const query = `/Chat/chat/${props.id}`;
    const { data } = await $api.get<BaseResponseWithData<Chat>>(query);
    return data;
  }

  async getChats(props: GetChatsRequestProps) {
    const query = `/Chat/chats/${props.chatOwnerId}`;
    const { data } = await $api.get<BaseResponseWithData<Chat[]>>(query);
    return data;
  }

  async getPageOfChats(props: GetPageOfChatsRequestProps) {
    const query = `/Chat/dogs
    ?${props.nameSearchTerm ?? `nameSearchTerm=${props.nameSearchTerm}`}
    &${props.sortColumn ?? `sortColumn=${props.sortColumn}`}
    &${props.sortOrder ?? `sortOrder=${props.sortOrder}`}
    &pageCount=${props.pageCount}
    &page=${props.pageCount}`;

    const { data } = await $api.get<BaseResponseWithData<Chat[]>>(query);
    return data;
  }

  async addUsersToChat(props: AddUsersToChat) {
    const query = '/Chat/chat/users';
    const { data } = await $api.post<BaseResponse>(query, props);
    return data;
  }

  async deleteUsersToChat(props: DeleteUsersFromChat) {
    const query = '/Chat/chat/users';
    const { data } = await $api.put<BaseResponse>(query, props);
    return data;
  }

  async updateChat(props: UpdateChatRequestProps) {
    const query = '/Chat/chat';
    const { data } = await $api.put<BaseResponse>(query, props);
    return data;
  }

  async deleteChat(props: DeleteChatRequestProps) {
    const query = `/Chat/chat/${props.id}`;
    const { data } = await $api.delete<BaseResponse>(query);
    return data;
  }
}
