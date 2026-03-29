import config from '../config/config.js'
import { Client, Account, ID } from 'appwrite';
// FIX: ID was used in createAccount but never imported

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        // FIX: was createAccount(email,password,name) — called with a single object in Signup.jsx
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        // FIX: was login(email, password) — but called as login({email,password})
        try {
            return await this.account.createEmailPasswordSession(email, password);
            // FIX: createEmailSession is deprecated in Appwrite SDK v13+; use createEmailPasswordSession
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // FIX: unreachable return null after throw; changed to return null in catch
            console.log("Appwrite :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            console.log("Appwrite :: logout :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
