import config from '../config/config.js'
import { Client, Account, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredimage, status, userId }) {
        // FIX: renamed to createPost (capital P) to be consistent with callers
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                { title, content, featuredimage, status, userId }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                { title, content, featuredimage, status }
            );
        } catch (error) {
            // FIX: typo "apprwrite server::updatepist::error" → clean message
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        // FIX: renamed deletepost → deletePost (capital P)
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        // FIX: was duplicated — one getPost(slug) and one getPost(queries). Renamed to getPostBySlug
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return null;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        // FIX: was a duplicate getPost() — renamed to getPosts to match callers in Home.jsx & AllPost.jsx
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return null;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(config.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        // FIX: was getFIlePreview (capital I typo) — renamed to getFilePreview
        // FIX: was calling this.bucket.getFIlePreview which doesn't exist; correct method is getFilePreview
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service();
// FIX: was exporting Service class instead of service instance
export default service;
