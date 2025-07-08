import {Account, Avatars, Client,Storage, Databases, ID, Query} from "react-native-appwrite";
import {CreateUserParams, GetMenuParams, SignInParams} from "@/type";

export const appwriteConfig = {
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform:"com.codebasejournal.foodordering",
    databaseId:'686ae9800037770be80f',
    bucketId:'686d004a00039cb8199c',
    userCollectionId:"686ae9af000ac1a388a6",
    categoriesCollectionId:"686cfa79002777e85bf7",
    menuCollectionId:"686cfb4d0032660ba33e",
    customizationsCollectionId:"686cfeba0003c90a11b3",
    menuCustomizationsCollectionId:"686cff69000b62c062b1"
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)
        if(!newAccount) throw Error;

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl }
        );
    } catch (e) {
        throw new Error(e as string);
    }
}

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCurrentUser = async () => {
    try{
        const currentAccount = await account.get()
        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentAccount) throw Error;
        return currentUser.documents[0];
    }catch (e) {
        console.error(e as string);
        throw new Error(e as string);
    }
}

export const getMenu = async ({category, query}:GetMenuParams) =>{
    try {
        const queries:string[] = []

        if(category)queries.push(Query.equal('categories',category));
        if(query)queries.push(Query.search('name',query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries
        )
        
        return menus.documents;
    }catch (e){
        throw new Error(e as string);
    }
}

export const getCategories = async () => {
    try{
         await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )
    }catch (e) {
        throw new Error(e as string);
    }
}