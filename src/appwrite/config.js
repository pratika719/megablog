import config from '../config/config.js'
import { Client, Account, ID,Databases,Storage,Query} from 'appwrite';

export class Service{

    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.account = new Account(this.client);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createpost({title,slug,content,featuredimage,status,userId}){
        try{
            return await this.databases.createDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,{

                title,
                
                content,
                featuredimage,
                status,
                userId}
               

            )
}
 catch(error){
    console.log(err0r)
 }

}



async updatePost(slug,{title,content,featuredimage,status,userId}){
 try{
    return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
            title,
            content,
            featuredimage,
            status
            
        })

    }
    


    

 
 
 catch(error){
    console.log("apprwrite server::updatepist::error",error);


 }

}

async deletepost(slug){
    try {
        await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )
        return true
        
    } catch (error) {
        console.log("delete erorr",error);
        return false
 }
}

async getPost(slug){
    try{
        return await this.databases.getDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug)
}
catch(error){
        console.log("get erorr",error);


}
}

async getPost(queries=[Query.equal("status","active")]){
    try{
        return await this.databases.listDocuments(config.appwriteDatabaseId,config.appwriteCollectionId,
            queries,
        )
}
catch(error){
        console.log("appwrite service getpost error",error);


}
}

async uploadFile(file){
    try {
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file


        )
        
    } catch (error) {
        console.log("appwite service upload");
        return false

        
    }
}

async deleteFile(fileId){
    try {
       await this.bucket.deleteFile(
        config.appwriteBucketId,fileId
       )
       return true
        
    } catch (error) {
        console.log("deletefile error",error)

        
    }



}

getFIlePreview(fileId){
    return this.bucket.getFIlePreview(
        config.appwriteBucketId,
        fileId
    )
}

}


const service = new Service()
export default Service
