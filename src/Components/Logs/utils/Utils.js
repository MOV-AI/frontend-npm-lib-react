import React from "react";
import _isEmpty from "lodash/isEmpty";

// export const levels = [
//   { value: "INFO", label: i18n.t("Robot Status") },
//   // { value: "WARNING", label: "Warnings" },
//   // { value: "DEBUG", label: "Debug" },
//   { value: "ERROR", label: i18n.t("Alerts") }
//   // { value: "CRITICAL", label: "Critical" }
// ];

export const colorCoding = {
  INFO: {
    backgroundColor: "rgba(33, 150, 243, 0.1)"
  },
  WARNING: {
    backgroundColor: "rgba(255, 152, 0, 0.1)"
  },
  DEBUG: {
    backgroundColor: "rgba(76, 175, 80, 0.1)"
  },
  ERROR: {
    backgroundColor: "rgba(244, 67, 54, 0.1)"
  },
  CRITICAL: {
    backgroundColor: "rgba(255, 19, 1, 0.1)"
  }
};

// export const fixedColumns = {
//   Date: {
//     label: i18n.t("Date"),
//     dataKey: "time",
//     width: 100,
//     render: time => getJustDateFromServer(time)
//   },
//   Time: {
//     label: i18n.t("Time"),
//     dataKey: "time",
//     render: time => getJustTimeFromServer(time),
//     width: 100
//   },
//   Level: {
//     label: i18n.t("Level"),
//     dataKey: "level",
//     width: 100
//   },
//   Module: {
//     label: i18n.t("Module"),
//     dataKey: "module",
//     width: 100
//   },
//   Function: {
//     label: "Function",
//     dataKey: "funcName",
//     width: 100
//   },
//   Callback: {
//     label: i18n.t("Callback"),
//     dataKey: "callback",
//     width: 100
//   },
//   Node: {
//     label: i18n.t("Node"),
//     dataKey: "node",
//     width: 100
//   },
//   Fleet: {
//     label: i18n.t("Fleet"),
//     dataKey: "fleet",
//     width: 100
//   },
//   Robot: {
//     label: i18n.t("Robot"),
//     dataKey: "robot",
//     width: 100
//   },
//   Message: {
//     label: i18n.t("Message"),
//     dataKey: "message",
//     width: 100
//   }
// };

// Makes sure to find unique "i" of chip array
// Input: [{key: 0, label: "Chip1"}, {key: 2, label: "Chip3"}], keyName= "key"
// Output: 1
export function findsUniqueKey(array, keyName) {
  const length = array.length;
  // If empty, return 0
  if (length === 0 || array === undefined) {
    return 0;
  }
  for (let k = 0; k < length; k++) {
    for (let j = 0; j < length; j++) {
      if (k === array[j][keyName]) {
        break;
      }
      if (j === length - 1) {
        return k;
      }
    }
  }

  return length;
}

// Converts the levels in the state for the string for the request
//  Input: ["INFO", "DEBUG"]
//  Output: "level=info,debug"
export function getRequestLevels(levelsArray, levelsList) {
  let res = "";
  if (
    (Array.isArray(levelsArray) && levelsArray.length === levelsList.length) ||
    levelsArray.length === 0
  ) {
    return res;
  }

  try {
    levelsArray.forEach(level => {
      if (res === "") {
        res = `${level.toLowerCase()}`;
      } else {
        res = `${res},${level.toLowerCase()}`;
      }
    });
    return `level=${res}&`;
  } catch (error) {
    return "";
  }
}
export function getRequestService(selectedService, serviceList) {
  let res = "";
  if (
    Array.isArray(selectedService) &&
    selectedService.length === serviceList.length
  ) {
    return res;
  }

  try {
    let sep = "";
    let services = "";
    selectedService.forEach(service => {
      services += `${sep}${service.toLowerCase()}`;
      sep = ",";
    });
    return `&services=${services}`;
  } catch (error) {
    console.warn("Error Requesting Service", error);
    return "";
  }
}

// Converts the levels in the state for the string for the request
//  Input: [{ key: 0, label: "UI" }, { key: 1, label: "TASKS" }]
//  Output: "&tags=UI,TASKS"
export function getRequestTags(tagsArray) {
  let res = "";

  if (_isEmpty(tagsArray)) {
    return res;
  }

  tagsArray.forEach(tag => {
    if (res === "") {
      res = `${tag.label}`;
    } else {
      res = `${res},${tag.label}`;
    }
  });

  return `&tags=${res}`;
}
// Converts the levels in the state for the string for the request
//  Input: "r'started\.$"
//  Output: "&message=r'started\.$"
export function getRequestMessage(message) {
  if (!message || message === "") {
    return "";
  }
  // Parse message to URL and return
  const parsedMessageToUrl = message.replace(/ /g, "+");
  return `&message=${parsedMessageToUrl}`;
}

// Convert Date format to a human readable format
// Input: 1586370146
// Output: "08/04/2020 19:22:26"
export const getTimeFromServer = serverTime => {
  const time = new Date(serverTime * 1000);
  return `${time.toLocaleString("pt")}`;
};
// Convert Date format to a human readable format
// Input: 1586370146
// Output: "08/04/2020"
export const getJustDateFromServer = serverTime => {
  const time = new Date(serverTime * 1000);
  return `${time.toLocaleDateString("pt")}`;
};
// Convert Date format to a human readable format
// Input: 1586370146
// Output: "19:22:26"
export const getJustTimeFromServer = serverTime => {
  const time = new Date(serverTime * 1000);
  return `${time.toLocaleTimeString("pt")}`;
};

// Convert array of object to array of strings for LogList
// Input:
// [
//   {
//     time: 1586370146,
//     level: "INFO",
//     message: "UI Tag Log Test: 12"
//   },
//   {
//     time: 1586370147,
//     level: "INFO",
//     message: "UI Tag Log Test: 13"
//   }
// ];
// Output
// [
//   "[08/04/2020 19:22:26] [INFO] : UI Tag Log Test: 12",
//   "[08/04/2020 19:21:31] [INFO] : UI Tag Log Test: 56"
// ];

export const formatLogsData = data => {
  return data.map(
    elem => elem.stdout
    // `[${getTimeFromServer(elem.time)}] [${elem.level}] : ${elem.message}`
  );
};

function binaryIndexOf(data, criteria) {
  var minIndex = 0;
  var maxIndex = data.length - 1;
  var currentIndex;
  var currentElement;
  var result = null;

  while (minIndex <= maxIndex) {
    currentIndex = ((minIndex + maxIndex) / 2) | 0;
    currentElement = data[currentIndex];
    var comparison = criteria(currentElement);

    if (comparison[0] === "right") {
      minIndex = currentIndex + 1;
    } else {
      maxIndex = currentIndex - 1;
    }

    if (comparison[1]) {
      result = currentIndex;
    }
  }

  return result;
}

export const filterByFromToDates = (logsData, fromDate, toDate) => {
  // If there is a problem fetching the logs, show nothing
  if (!logsData) {
    return [];
  }

  let lowerIndex = 0;
  let upperIndex = logsData.length;

  // If nothing is selected, do nothing
  if (!fromDate && !toDate) {
    return logsData;
  }

  // List of time format. Array is sorted in descending order (Newer -> Older)
  const dateList = logsData.map(log => log.time);
  if (toDate) {
    // First log that is <= toDate (first index that fits criteria)
    lowerIndex = binaryIndexOf(dateList, function (value) {
      return value >= toDate.getTime() / 1000
        ? ["right", false]
        : ["left", true];
    });
  }
  if (fromDate) {
    // First log that is >= fromDate (last index that still fits criteria)
    upperIndex = binaryIndexOf(dateList, function (value) {
      return value <= fromDate.getTime() / 1000
        ? ["left", false]
        : ["right", true];
    });
  }
  return logsData.slice(lowerIndex, upperIndex + 1);
};

// This function is to get the same string as the one you get in
// Robot:Status nodes_lchd and persistent_nodes_lchd
export const addNestedName = (nestedName, newName) => {
  if (nestedName === "") {
    return newName;
  } else {
    return `${nestedName}__${newName}`;
  }
};

// Will update according with the list of running nodes all the nodes to running or stopped
export const updateRunningNodes = (treeList, runningNodesList) => {
  return treeList.map(elem => {
    // Only update the status of nodes, not containers
    if (elem.status) {
      if (runningNodesList.includes(elem.nestedName)) {
        return { ...elem, status: "running" };
      } else {
        return { ...elem, status: "stopped" };
      }
    } else {
      return elem;
    }
  });
};

// This will remove the deleted container from the treeList and its respective children
export const removeDeleteContainer = (treeList, id) => {
  // Get the id of the Container to remove
  const deleteIndex = treeList.findIndex(elem => elem.id === id);
  treeList.splice(deleteIndex, 1);
  // Remove children: find all children with parentId that is the id
  for (let i = 0; i < treeList.length; i++) {
    if (treeList[i].parentId === id) {
      removeDeleteContainer(treeList, treeList[i].id);
    }
  }
};

// Detects if there are loops within nested containers
// Returns true if it finds a loop, false otherwise
export const detectContainerLoop = (treeList, parentId, flowId) => {
  // If first level there are no loops
  if (parentId === 0) {
    return false;
  }
  // index of container to add
  let flowIndex = treeList.findIndex(elem => elem.id === parentId);
  let currentFlow = treeList[flowIndex];
  // Stop when reaches the root of the tree
  while (currentFlow.parentId) {
    // get the parentId of the current container
    const parentId = currentFlow.parentId;
    // get the index of that parent in the array
    flowIndex = treeList.findIndex(elem => elem.id === parentId);
    currentFlow = treeList[flowIndex];
    if (currentFlow.flowId === flowId) {
      console.error("Found Flow Loop :0");
      return true;
    }
  }
  return false;
};
