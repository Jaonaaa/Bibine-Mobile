export const storage = {
  connectivity: "connectivity",
  firstTime: "first_in",
  homePage: "/main/home",
  //user
  user_connected: "user_connected",
  user_name: "username",
  token: "user_token",
  user: "user",
  refresh_token: "refresh_token",
  details_user: "details_user",
};

export interface messageStruct {
  senderName: string;
  content: string;
  senderId: string;
  picturePath: string;
}

export const getUser = (): any => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user) as any;
  }
  return user;
};
