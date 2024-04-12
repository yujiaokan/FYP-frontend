import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import { db } from '../useraccount/firebase/firebase';
import { useNavigation } from '@react-navigation/native';
interface MessageItem {
    id: string;
    texts: string;
    username:string;
    timestamp:Date;
    read: boolean;
    
  }
  
  interface ListItemProps {
    item: MessageItem;
  }
function Messages() {
    const navigation:any = useNavigation();
    const [messages, setMessages] = useState([]);
 
    useEffect(() => {
       

        const unsubscribeAuth = auth().onAuthStateChanged((user) => {
            if (user) {
              const userId = user.uid;
              const messagesQuery = query(
                collection(db, 'usermessages'),
                where('receiverId', '==', userId)
              );
      
              const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
                const loadedMessages: MessageItem[] = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    // Convert the timestamp here
                    const date = data.timestamp.toDate(); 
                    return {
                      id: doc.id,
                      texts: data.texts,
                      username: data.username,
                      timestamp: date,  // Now it's a Date object
                      read: data.read,
                    };
                  });
                  
                  setMessages(loadedMessages);
              });
      
              return () => unsubscribeMessages();
            }
          });
      
          return () => unsubscribeAuth();
        }, []);
        

      const ListItem: React.FC<ListItemProps> = ({ item }) => {
        const handlePress = () => {
          
            navigation.navigate('eachmessage', { userName: item.username,texts:item.texts, timestamp: item.timestamp  });
          };
        return (
           
            <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
                <Text style={item.read ? styles.itemTextRead :styles.itemTextUnread}>
                {item.username+'             '+item.timestamp}
                
                </Text>
            
            </TouchableOpacity>
          
        
        );
      };
    
  return (
    <View style={styles.container}>
    <Text style={{alignSelf:'center',fontSize:15,fontWeight:'bold',marginBottom:10}}>My Message</Text>
  
    <FlatList
      data={messages}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <ListItem item={item} />}
    />
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
 
    itemContainer: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    itemTextUnread: {
      fontWeight: 'bold',
      color:'#600080'
    },
    itemTextRead: {
        color:'grey'
    },
  });

  
export default Messages