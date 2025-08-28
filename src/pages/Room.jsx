import React, { useState, useEffect } from 'react'
import { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../appwriteconfig'
import { useAuth } from '../utils/AuthContext'
import client from '../appwriteconfig'
import { ID,Query,Role,Permission } from 'appwrite'
import {Trash2} from 'react-feather'
import Header from '../components/Header'

export default function Room() {

    const {user} = useAuth()
    const [messages, setMessages] = useState([])
    const [messageBody, setMessageBody] = useState('')
    useEffect(() => {
        getMessages()
       const unsubscribe =  client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
            // Callback will be executed on changes for documents A and all files.
            console.log("real time:",response);
            if(response.events.includes("databases.*.collections.*.documents.*.create")){
              console.log("an item was created")
              setMessages(prevState => [response.payload,...prevState])
            }
            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                console.log("an item was deleted!!")
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
              }
        });
  return ()=>{
    unsubscribe()
      }

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let payload = {
            user_id: user.$id,
            username:user.name,
            body: messageBody
        }
        let permissions = [
             Permission.write(Role.user(user.$id))
        ]
        let response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
            permissions
        )
        console.log("created",response)
        //setMessages(prevState => [response,...messages])
        setMessageBody('')
    }

        const getMessages = async () => {
            const response = await databases.listDocuments(
                DATABASE_ID, 
                COLLECTION_ID_MESSAGES
                ,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(70),
            ]
            )
            console.log('response:', response)
            setMessages(response.documents)
        }

        const deleteMessage = async (message_id) => {
            await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id)
            //setMessages(prevState => messages.filter(message => message.$id !== message_id))
        }
        return (
            <main className='container'>
                <Header/>
                <div className="room--container">
                    
                <form onSubmit={handleSubmit} id='message--form'>
                        <div>
                            <textarea  required maxLength="1000" placeholder='Message...' onChange={(e) => setMessageBody(e.target.value)}
                                value={messageBody}>

                            </textarea>
                        </div>
                              <div className='send-btn--wrapper'>
                                <input type="submit" value="Send" className='btn btn--secondary' />
                              </div>
                    </form>
                    <div>
                        {messages.map(message => (
                            <div key={message.$id} className='message--wrapper'>
                                <div className='message--header'>
                                    <p className='register-link'>{message?.username?(<span>{message.username}</span>):(<span>ananymous user</span>) }
                                    <span className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</span>
                                    </p>
                                    {message.$permissions.includes(`delete(\"user:${user.$id}\")`) &&
                                     <Trash2 className='delete--btn' onClick={()=>{deleteMessage(message.$id)}}/> }
                                    
                                      
                                </div>
                                <div className='message--body'>
                                    <span>{message.body}</span>
                                </div>
                                
                            </div>

                        ))}
                    </div>
                   
                </div>
            </main>
        )
    }

