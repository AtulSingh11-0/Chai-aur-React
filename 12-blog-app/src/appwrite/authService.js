import { ID, Account, Client } from "appwrite";
import config from "../config/config";

/**
 * Authentication Service
 *
 * Handles all authentication-related operations including user registration,
 * login, logout, and session management using Appwrite's Account API.
 *
 * @class AuthService
 */
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  /**
   * Register a new user account and automatically log them in
   *
   * Creates a new user account with the provided credentials. After successful
   * registration, the user is automatically logged in by creating a new session.
   *
   * @async
   * @param {Object} params - Registration parameters
   * @param {string} params.name - Full name of the user
   * @param {string} params.email - Email address (must be unique)
   * @param {string} params.password - Password (minimum 8 characters)
   *
   * @returns {Promise<Object>} Session object for the newly created and logged-in user
   *
   * @throws {Error} "Email already exists" - If the email is already registered
   * @throws {Error} "Invalid email or password format" - If credentials don't meet requirements
   * @throws {Error} Network or server errors from Appwrite
   *
   * @example
   * try {
   *   const session = await authService.signUp({
   *     name: 'John Doe',
   *     email: 'john@example.com',
   *     password: 'SecurePass123!'
   *   });
   *   console.log('User registered and logged in:', session);
   * } catch (error) {
   *   console.error('Registration failed:', error.message);
   * }
   */
  async signUp({ name, email, password }) {
    try {
      // Create new user account
      const user = await this.account.create({
        userId: ID.unique(),
        name,
        email,
        password,
      });

      // TODO: Implement email verification flow
      // - Send verification email using this.account.createVerification()
      // - Provide verification URL that redirects to app
      // - Handle verification token on callback route

      // Automatically log in after successful registration
      return await this.login({ email, password });

      // TODO: Add user profile creation
      // - Create a document in users collection with additional profile data
      // - Store preferences, settings, avatar, etc.
      // - Link profile document to user account

      // TODO: Send welcome email
      // - Integrate email service (SendGrid, Mailgun, etc.)
      // - Send personalized welcome message
      // - Include getting started guide or resources

      // TODO: Add analytics tracking
      // - Track successful registration event
      // - Log user acquisition source
      // - Send to analytics platform (Google Analytics, Mixpanel, etc.)
    } catch (err) {
      console.error("Sign up error:", err);

      if (err.code === 409) {
        throw new Error("Email already exists");
      }

      if (err.code === 400) {
        throw new Error("Invalid email or password format");
      }

      throw err;
    }
  }

  /**
   * Log in an existing user with email and password
   *
   * Creates a new session for the user with the provided credentials.
   * A user can have up to 10 active sessions at a time by default.
   *
   * @async
   * @param {Object} params - Login credentials
   * @param {string} params.email - User's email address
   * @param {string} params.password - User's password
   *
   * @returns {Promise<Object>} Session object containing session details
   *
   * @throws {Error} "Invalid email or password" - If credentials are incorrect
   * @throws {Error} Network or server errors from Appwrite
   *
   * @example
   * try {
   *   const session = await authService.login({
   *     email: 'john@example.com',
   *     password: 'SecurePass123!'
   *   });
   *   console.log('Logged in successfully:', session);
   * } catch (error) {
   *   console.error('Login failed:', error.message);
   * }
   */
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({
        email,
        password,
      });
    } catch (err) {
      console.error("Login error:", err);

      if (err.code === 401) {
        throw new Error("Invalid email or password");
      }

      throw err;
    }
  }

  /**
   * Get the currently logged-in user's account information
   *
   * Retrieves the account details of the currently authenticated user.
   * Returns null if no user is logged in, making it easy to check auth status.
   *
   * @async
   * @returns {Promise<Object|null>} User account object if logged in, null otherwise
   *
   * @throws {Error} Network or server errors from Appwrite (except 401)
   *
   * @example
   * const user = await authService.getCurrentUser();
   * if (user) {
   *   console.log('Current user:', user.name, user.email);
   * } else {
   *   console.log('No user logged in');
   * }
   */
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      // Return null if no user is logged in (common case, not an error)
      if (err.code === 401) {
        return null;
      }
      console.error("Get current user error:", err);
      throw err;
    }
  }

  /**
   * Log out the user from the current session
   *
   * Deletes the current device session and logs out the user.
   * The user will need to log in again to access protected resources.
   * Other active sessions on different devices remain active.
   *
   * @async
   * @returns {Promise<Object>} Response object from Appwrite
   *
   * @throws {Error} Network or server errors from Appwrite
   *
   * @example
   * try {
   *   await authService.logout();
   *   console.log('Logged out successfully');
   * } catch (error) {
   *   console.error('Logout failed:', error);
   * }
   */
  async logout() {
    try {
      return await this.account.deleteSession({
        sessionId: "current",
      });
    } catch (err) {
      console.error("Logout error:", err);
      throw err;
    }
  }

  /**
   * Log out the user from all sessions across all devices
   *
   * Deletes all active sessions for the current user, effectively logging them
   * out from all devices where they are currently signed in. The user will need
   * to log in again on all devices.
   *
   * Use this for security-sensitive operations like password changes or when
   * a user wants to sign out everywhere.
   *
   * @async
   * @returns {Promise<Object>} Response object from Appwrite
   *
   * @throws {Error} Network or server errors from Appwrite
   *
   * @example
   * try {
   *   await authService.logoutAllSessions();
   *   console.log('Logged out from all devices');
   * } catch (error) {
   *   console.error('Logout all sessions failed:', error);
   * }
   */
  async logoutAllSessions() {
    try {
      return await this.account.deleteSessions();
    } catch (err) {
      console.error("Logout all sessions error:", err);
      throw err;
    }
  }
}

/**
 * Default instance of AuthService
 *
 * Pre-configured singleton instance ready to use throughout the application.
 * Import this instance to use authentication features without creating a new instance.
 *
 * @example
 * import authService from './authService';
 *
 * const session = await authService.login({ email, password });
 */
export default new AuthService();
