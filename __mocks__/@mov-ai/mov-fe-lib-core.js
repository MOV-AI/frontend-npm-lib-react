import { CONSTANTS, authSub } from "@mov-ai/mov-fe-lib-core";

const Authentication = {
  checkLogin: jest.fn().mockResolvedValue(false),
  refreshTokens: jest.fn().mockResolvedValue(true),
  getToken: jest.fn().mockReturnValue("token"),
  getProviders: jest.fn().mockResolvedValue({ domains: ["internal", "ldap"] }),
  DEFAULT_PROVIDER: "internal",
};

const User = function () {
  return {
    getCurrentUserWithPermissions: jest.fn().mockResolvedValue({
      Resources: {
        Applications: [],
      },
      Superuser: true,
    }),
  };
};

// Constansts

export { Authentication, User, CONSTANTS, authSub };
