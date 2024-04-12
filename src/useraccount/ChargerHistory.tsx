import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { db } from '../useraccount/firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface MessageItem {
  id: string;
  userId: string;
  chargerId: string;
  starttime: string;
  endtime: string;
  createddate: Date;
}

interface ListItemProps {
  item: MessageItem;
}

function ChargerHistory() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user is", user);
        setUserId(user.uid);
      }
    });

    return subscriber;
  }, []);

  useEffect(() => {
    const fetchChargingHistory = async () => {
      if (userId) { 
        const q = query(collection(db, 'ChargerHistory'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const history = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const date = data.createddate.toDate();
          return {
            id: doc.id, 
            userId: data.userId, 
            chargerId: data.chargerId,
            starttime: data.starttime,
            endtime: data.endtime,
            createddate: date,
          };
        });

        setMessages(history);
      }
    };

    fetchChargingHistory();
  }, [userId]); 

  const ListItem: React.FC<ListItemProps> = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text>
          {item.chargerId} - {item.createddate.toLocaleString()}
        </Text>
      
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
        <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold'}}>Charger History</Text>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ListItem item={item} />}
      />
    </View>
  );
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

  
export default ChargerHistory