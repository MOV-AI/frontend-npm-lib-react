const Authentication = {
  checkLogin: jest.fn().mockResolvedValue(false),
  refreshTokens: jest.fn().mockResolvedValue(true),
  getToken: jest.fn().mockReturnValue("token"),
  getProviders: jest.fn().mockResolvedValue({ domains: ["internal", "ldap"] }),
  DEFAULT_PROVIDER: "internal"
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

// Constansts

const SERVICE_LIST = ["backend", "spawner"];

export { Authentication, User, SERVICE_LIST };
