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
          "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSZWZyZXNoIiwiaXNzIjoiYmFja2VuZCIsImlhdCI6MTY4MTc1MTIzNiwiZXhwIjoxNjgyMzU2MDM2LCJqdGkiOiI3ZDVjZDMzMy0xNGVjLTQwYzktYjNkMS1kN2VmMmZkODNlNjUiLCJyZWZyZXNoX2lkIjoiIiwiZG9tYWluX25hbWUiOiJpbnRlcm5hbCIsImFjY291bnRfbmFtZSI6ImFkbWluIiwiY29tbW9uX25hbWUiOiJBZG1pbiIsInVzZXJfdHlwZSI6IklOVEVSTkFMIiwicm9sZXMiOlsiQURNSU4iXSwiZW1haWwiOiIiLCJzdXBlcl91c2VyIjp0cnVlLCJyZWFkX29ubHkiOmZhbHNlLCJzZW5kX3JlcG9ydCI6ZmFsc2V9.s4uXJ3Tu8GiVvz4BPd7bKgO5kBdScnCcL9vlMRBuNr8",
          "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBY2Nlc3MiLCJpc3MiOiJiYWNrZW5kIiwiaWF0IjoxNjgxNzUxMjM2LCJleHAiOjE2ODE3NTQ4MzYsImp0aSI6IjA0MmIyNDQ5LTU4MTQtNDcyNS1hYTNiLTM3ZGQ3OGJhZmMxNCIsInJlZnJlc2hfaWQiOiI3ZDVjZDMzMy0xNGVjLTQwYzktYjNkMS1kN2VmMmZkODNlNjUiLCJkb21haW5fbmFtZSI6ImludGVybmFsIiwiYWNjb3VudF9uYW1lIjoiYWRtaW4iLCJjb21tb25fbmFtZSI6IkFkbWluIiwidXNlcl90eXBlIjoiSU5URVJOQUwiLCJyb2xlcyI6WyJBRE1JTiJdLCJlbWFpbCI6IiIsInN1cGVyX3VzZXIiOnRydWUsInJlYWRfb25seSI6ZmFsc2UsInNlbmRfcmVwb3J0IjpmYWxzZX0.bOeJBSZi60M8jq_nrIwYV6V4IjVF_WJFp35haiCpNhg",
          "error": false
        }
      }
    }
  ]
};
