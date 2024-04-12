import 'react-native-get-random-values';
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { StyleSheet, View,SafeAreaView } from "react-native";
import axios from 'axios';
import { GPT_KEY } from "@env";
import { v4 as uuidv4 } from 'uuid';

function Chartbot(){
     const [messages, setMessages] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        myPrompt('hey')
    }, [])

    const myPrompt = (text: any) =>{
        const url = 'https://api.openai.com/v1/chat/completions'
        const config = {
            headers: {
                Authorization: `Bearer ${GPT_KEY}`
                
              
            }
        }

        const data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": `You are a helping assistant for my electric home charger share
                    app and you could provide a detail of repair shop address in Ireland if users needed.
                    Provide guidelines on how to find the best charger based on user 
                    preferences like you answer like ypu can find the available charger list on the main map Screen of your electric car charger apps and there has 
                    description and detail for each charger place, charging price is €10 per hour , 
                    and charger type usually is 7.5kw,if you want provide your home charger for others, don't be afarid that you can cancel 
                    at any time after you registered your home electric car charger if you're no longer want to share it.
                    Please follow these rules:
                    1. Answer the user's questions directly.
                    2. Offer additional relevant information when beneficial.
                    3. Maintain a friendly and professional tone.`
                },
                {
                    "role": "user",
                    "content": "I'm looking for an electric car charger near me. Can you help?"
                },
                {
                    "role": "user",
                    "content": "Preferably one that is available 24/7 and has fast charging options."
                },
                {
                    "role": "user",
                    "content": "I'm looking for an repair shops for electric car . Can you help find an address?"
                },
                {
                    "role": "user",
                    "content": ""
                },
                {
                    "role": "user",
                    "content": `${text}`
                }
            ],
            "temperature": 0.7,
            "stream": false
        }
        setLoading(true)
        axios.post(url, data,config).then((res)=>{
            let result = res.data.choices[0]['message']['content']

            let my_value = [
                {
                    _id: uuidv4(),
                    text: result,
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: 'system',
                        avatar: require("../../assets/images/chatgpt.jpeg"),
                    },
                },
            ]

            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, my_value),
            )
            setLoading(false)
        }).catch((error) => {
            console.log("error raised", error)
            setLoading(false)
        })

        
    }

    
    

    const onSend = useCallback((messages: any[]) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages),
        )

        myPrompt(messages[0]?.text)
      }, [])

    return(
        <View style={styles.container}>
            <SafeAreaView style={{ flex:1}}> 
                <GiftedChat
                    isTyping={isLoading}
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    showUserAvatar
                    user={{
                        _id: 2,
                        name: 'user',
                        avatar: require("../../assets/images/user.png"),
                    }}
                />
           </SafeAreaView>
        </View>
    )


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    }
})

export default Chartbot 