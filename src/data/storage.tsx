export const storage = {
  connectivity: "connectivity",
  firstTime: "first_in",
  homePage: "/main/home",
  //user
  user_connected: "user_connected",
  user_name: "username",
  token: "user_token",
  user_email: "email",
};

export interface userStruct {
  id: string;
  username: string;
  picturePath: string;
}
export interface messageStruct {
  sender: userStruct;
  content: string;
  receiver_id: string;
}
