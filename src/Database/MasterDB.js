import Database from "./Database";
/**
 * A Database singleton
 */
class MasterDB {
  constructor() {
    if (instance) return instance;
    instance = this;
    this.db = new Database();
  }

  static subscribe = (
    pattern,
    callback = undefined,
    evtCallback = undefined
  ) => {
    new MasterDB().db.subscribe(pattern, callback, evtCallback);
  };

  static unsubscribe = (pattern, evtCallback = undefined) => {
    new MasterDB().db.unsubscribe(pattern, evtCallback);
  };

  static list = (evtCallback = undefined) => {
    new MasterDB().db.list(evtCallback);
  };

  /**
   * Set value from key in Scope
   * @param scope String
   * @param name String - Instance Name
   * @param key String - Key to override
   * @param value Obj
   * @param callback function
   */
  static post = (scope, name, key, value, callback = undefined) => {
    new MasterDB().db.post(scope, name, key, value, callback);
  };

  static upload = (packageName, key, value, callback = undefined) => {
    new MasterDB().db.post(packageName, key, value, callback);
  };

  /**
   * Update key
   * @param scope String
   * @param name String - Instance Name
   * @param value Obj
   * @param callback function
   */
  static put = (scope, name, value, callback = undefined) => {
    new MasterDB().db.put(scope, name, value, callback);
  };

  /**
   * Set value from key in Scope
   * @param scope String
   * @param name String - Instance Name
   * @param key String - Key to override
   * @param value Obj
   * @param callback function
   */
  static delete = (scope, name, callback = undefined, data = {}) => {
    new MasterDB().db.delete(scope, name, callback, data);
  };

  /**
   * Set value from key in Scope
   * @param cloudFunction String - callback name
   * @param func String - Function in the callback. default ""
   * @param args Object - Args {key:value}... key is the param in the function
   * @param callback func - Callback to parse the response
   */
  static cloudFunction = (
    cloudFunction,
    func = "",
    args,
    callback = undefined
  ) => {
    new MasterDB().db.cloudFunction(cloudFunction, func, args, callback);
  };

  static getVar = (key, callback = undefined, scope = "global") => {
    new MasterDB().db.getVar(key, callback, scope);
  };

  static setVar = (key, value, callback = undefined, scope = "global") => {
    new MasterDB().db.setVar(key, value, callback, scope);
  };
}
// private instance
let instance = null;
export default MasterDB;
