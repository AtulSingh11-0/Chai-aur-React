import { Client } from "appwrite";
import config from "../config/config";
import { TablesDB } from "node-appwrite";

export class ProfileService {
  client = new Client();
  tablesDB;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);

    this.tablesDB = new TablesDB(this.client);
  }

  // get user profile by userId
  async getUserProfileByUserId(userId) {
    try {
      return await this.tablesDB.getRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteProfilesTableId,
        rowId: userId,
      });
    } catch (err) {
      if (err.code === 404) {
        return null; // Profile not found
      }
      // console.error("Error getting user profile:", err);
      // throw err;
    }
  }

  // create user profile

  // update user profile
}

export default new ProfileService();
