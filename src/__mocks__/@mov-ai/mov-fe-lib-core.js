const Authentication = {
  checkLogin: jest.fn().mockResolvedValue(false),
  refreshTokens: jest.fn().mockResolvedValue(true),
  getToken: jest.fn().mockReturnValue("token"),
  getProviders: jest.fn().mockResolvedValue({ domains: ["internal", "ldap"] })
};

const User = function () {
  return {
    getCurrentUserWithPermissions: jest.fn().mockResolvedValue({
      Resources: {
        Applications: []
      },
      Superuser: true
    })
  };
};

export { Authentication, User };
