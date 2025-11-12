import { CONSTANTS } from "@mov-ai/mov-fe-lib-core";

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

const Features = {
  get: jest.fn().mockReturnValue(false),
};

const RobotManager = {
  getRobots: jest.fn().mockResolvedValue([]),
  openLogs: jest.fn().mockResolvedValue([]),
  getLogs: jest.fn().mockResolvedValue({
    data: [
      {
        robot: "robot1",
        level: "ERROR",
        service: "spawner",
        runtime: false,
        module: "wsredissub",
        funcName: "wait_message",
        lineno: 616,
        message: "Timeout waiting for message",
        args: null,
        time: "8:25:00 PM",
        timestamp: 1762806300000,
        date: "11/10/2025",
        key: "Timeout waiting for message1762806300000",
      },
    ],
  }),
};

// Constansts

export { Authentication, User, CONSTANTS, Features, RobotManager };
