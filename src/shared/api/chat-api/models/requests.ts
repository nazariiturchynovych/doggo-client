export type CreateChatRequestProps = {
  name: string;
  firstUserId: string;
  secondUserId: string;
};

export type CreateGroupChatRequestProps = {
  name: string;
  userIds: string[];
};

export type GetChatRequestProps = {
  id: string;
};

export type GetChatsRequestProps = {
  chatOwnerId: string;
};

export type AddUsersToChat = {
  chatId: string;
  userIds: string[];
};

export type DeleteUsersFromChat = {
  chatId: string;
  userIds: string[];
};

export type GetPageOfChatsRequestProps = {
  nameSearchTerm?: string;
  sortColumn?: string;
  sortOrder?: string;
  pageCount: number;
  page: number;
};

export type UpdateChatRequestProps = {
  id: string;
  name: string;
};

export type DeleteChatRequestProps = {
  id: string;
};
