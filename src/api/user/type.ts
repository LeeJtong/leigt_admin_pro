// 登录请求参数类型
export type LoginRequest = {
  username: string;
  password: string;
};

// 登录响应信息类型
export type LoginResponse = {
  username: string;
  roles: Array<string>;
  accessToken: string;
};

// 刷新登录信息需要的参数
export type reLoginRequest = {
    accessToken: string;
};
