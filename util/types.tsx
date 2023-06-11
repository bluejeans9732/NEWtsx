import { ObjectId } from 'bson';

export interface Post {
  _id: ObjectId;
  title: string;
  content: string;
}

export interface Postprops {
    _id: ObjectId | string; // ObjectId와 string 모두 허용하는 유니온 타입 이거 해줘야합니다 무조건
    title: string;
    content: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string; // password 속성 추가
}

export interface Payload {
  notification: {
    title: string;
    body: string;
  }
}
