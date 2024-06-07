
export interface CategoriesResponse {
  total: number;
  categories: Category[];
}

export interface Category {
  _id: string;
  name: string;
  type: string;
  status: boolean;
  createdBy: User;
  updatedBy?: User;
  deletedBy?: User;
}


export interface ContentsResponse {
  total: number;
  contents: Content[];
}

export interface Content {
  _id: string;
  title: string;
  description: string;
  type: string;
  filePath?: string;
  createdBy: User;
  category: string;
  topic: Topic;
  status: boolean;
  url?: string;
}

export interface UsersResponse {
  total: number;
  users: User[];
}

export interface User {
  name: string;
  mail: string;
  role: string;
  status: boolean;
  google: boolean;
  username?: string;
  deletedBy?: User;
  updatedBy?: User;
  createdBy?: User;
  uid: string;
  userName?: string;
  image?: string;
}

export interface TopicsResponse {
  total: number;
  topics: Topic[];
}

export interface Topic {
  _id: string;
  name: string;
  allowedContentTypes: string[];
  status: boolean;
  createdBy: User;
  deletedBy?: User;
  updatedBy?: User;
}


