import {Client,Databases,Account} from 'appwrite'

export const PROJECT_ID = '677d8c9100200554e952'
export const DATABASE_ID = '677d8d1e0017fd5019f7'
export const COLLECTION_ID_MESSAGES = '677da737003e4eefa998'

const client = new Client();
export const databases = new Databases(client);
 export const account = new Account(client);

client.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('677d8c9100200554e952');



export default client;