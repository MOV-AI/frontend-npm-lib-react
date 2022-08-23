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
          refresh_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSZWZyZXNoIiwiaWQiOiI0MGM5YWU2Ni0yMDJmLTQ3MGQtOWYzZi1kZDA1YTY5ZGQwYWQiLCJpYXQiOjE2NjA5Mjc3NzksImV4cCI6MTY2MTUzMjU3OSwiZG9tYWluX25hbWUiOiJpbnRlcm5hbCIsImFjY291bnRfbmFtZSI6Im1vdmFpIiwiY29tbW9uX25hbWUiOiJNb3ZhaSIsInVzZXJfdHlwZSI6IklOVEVSTkFMIiwicm9sZXMiOlsiYWRtaW4iXSwiZW1haWwiOiIiLCJzdXBlcl91c2VyIjp0cnVlLCJyZWFkX29ubHkiOmZhbHNlLCJzZW5kX3JlcG9ydCI6ZmFsc2V9.OsSLLgxVKERTx_AE3iD8RUdUN_N90PfZAI2hNTcFTh0",
          access_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBY2Nlc3MiLCJpZCI6ImY0YzMzZGQ2LTBkOWQtNDAwYy1hN2QyLWU0ZWVkZTg1ZWRjZSIsImlhdCI6MTY2MDkyNzc3OSwiZXhwIjoxNjYwOTMxMzc5LCJkb21haW5fbmFtZSI6ImludGVybmFsIiwiYWNjb3VudF9uYW1lIjoibW92YWkiLCJjb21tb25fbmFtZSI6Ik1vdmFpIiwidXNlcl90eXBlIjoiSU5URVJOQUwiLCJyb2xlcyI6WyJhZG1pbiJdLCJlbWFpbCI6IiIsInN1cGVyX3VzZXIiOnRydWUsInJlYWRfb25seSI6ZmFsc2UsInNlbmRfcmVwb3J0IjpmYWxzZSwicmVmcmVzaF9pZCI6IjQwYzlhZTY2LTIwMmYtNDcwZC05ZjNmLWRkMDVhNjlkZDBhZCJ9.-Ibuiu_sf-6rkdrxAUYDG4eHYwKONKzU-8u7CKbo_3s",
          error: false
        };
      }
    }
  ]
};
