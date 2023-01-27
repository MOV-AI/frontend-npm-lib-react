// Please update the access and refresh token before start your developments
export const authParams = {
  mockData: [
    {
      url: "/token-auth/",
      method: "POST",
      status: 200,
      response: _ => {
        // MUST BE A REAL TOKEN FROM MOVAI BE
        return {
          "refresh_token": "",
          "access_token": "",
          "error": false
        }
      }
    }
  ]
};
