import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View,TouchableOpacity, Text, Button, StyleSheet } from 'react-native';
import ArrowLeftIcon from 'react-native-heroicons/solid/ArrowLeftIcon';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../useraccount/firebase/firebase';
import auth from '@react-native-firebase/auth';
import { verticalScale,horizontalScale } from '../../theme/Scalling';

const allTimes = [
    "5:00","5:30", "6:00", "6:30","7:00","7:30", "8:00", ",8:30","9:00","9:30", "10:00","10:30", "11:00","11:30", "12:00", "12:30","13:00",
    "13:30","14:00","14:30", "15:00","15:30", "16:00", "16:30","17:00","17:30", "18:00", "18:30","19:00", "19:30","20:00", "20:30","21:00",
    "21:30","22:00","22:30", "23:00", "23:30","24:00"
  ];
  const timeToMinutes = (time:any) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
    export function getTimesInRange(startTime: string, endTime: string) {
        const startIndex = allTimes.indexOf(startTime);
        const endIndex = allTimes.indexOf(endTime);
        if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {

          return [];
        }
        return allTimes.slice(startIndex, endIndex + 1);
      }

function CheckIN(route:any) {

  
  const [startbookedSlots, setstartBookedSlots] = useState<any>();
  const [endbookedSlots, setendBookedSlots] = useState<any>();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // for today's date

    const timeRange = route.route.params.availbleTime;
    const times = timeRange.split('-');
    const startTime = times[0];
    const endTime = times[1];
    const timesInRange = getTimesInRange(startTime, endTime);
    const newTimesInRange = timesInRange.slice(0, -1); 
    //this is for check not already booking time
  useEffect(() => {
    async function fetchChargerData() {
      // Fetch charger's available times
  
      // Fetch booked slots for this charger and date
      const bookingQuery = query(
        collection(db, 'chargerHistory'),
        where('chargerId', '==', charger),
        where('date', '==', selectedDate)
      );
      const bookingSnap = await getDocs(bookingQuery);
      const bookedstartTimes:any = bookingSnap.docs.map(doc => {doc.data().starttime });
      const bookedendTimes:any = bookingSnap.docs.map(doc => {doc.data().endtime });
      const timesInStart = bookedstartTimes.map((time: { split: (arg0: string) => [any, any]; }) => {
        const [hours, minutes] = time.split(':');
        return new Date(0, 0, 0, hours, minutes);
      });

      const timesInEnd = bookedendTimes.map((time: { split: (arg0: string) => [any, any]; }) => {
        const [hours, minutes] = time.split(':');
        return new Date(0, 0, 0, hours, minutes);
      });
      
      // Find min and max times
      const minTime = new Date(Math.min.apply(null, timesInStart));

      const maxTime = new Date(Math.max.apply(null, timesInEnd));
      
      // Format the times back into strings
      const formatTime = (date: Date) => {
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      };
      
      const minTimeString = formatTime(minTime);
      const maxTimeString = formatTime(maxTime);
      const endindex= newTimesInRange.indexOf(maxTimeString)
      const startMinutes = timeToMinutes(minTimeString);
      const endMinutes = timeToMinutes(newTimesInRange[endindex-1]);
      const displayTimes = newTimesInRange.filter(time=> {const timeMinutes = timeToMinutes(time);
      return timeMinutes < startMinutes || timeMinutes > endMinutes; });
      setendBookedSlots( newTimesInRange[endindex-1]);
      setstartBookedSlots(minTimeString);
    } if (charger) {
        fetchChargerData();
      }
    }, [selectedDate]);
    useEffect(()=>{
        console.log("doc is ", startbookedSlots);
    })
  
  
    const[charger,setCharger]=useState(route.route.params.charger)
    useEffect(()=>{
        setCharger(route.route.params.charger)
        console.log("route",newTimesInRange)
    },[charger])
    const navigation:any= useNavigation() 
    const [selectedStartTime, setselectedStartTime] = useState(startTime); // Default value
    const [selectedEndTime, setselectedEndTime] = useState(endTime); // Default value
    const [EndTime, setEndTime] = useState(endTime); // Default value
    const[ cost , setCost] = useState(0);
    // This state will hold the filtered end times based on the selected start time
  const [filteredEndTimes, setFilteredEndTimes] = useState(timesInRange);

  const updateEndTimes = (startTime: string) => {
    // Find the index of the selected start time
    const startIndex = timesInRange.indexOf(startTime);
    // Filter out the times that are before the selected start time
    const newEndTimes = timesInRange.slice(startIndex + 1);
    // If there are no end times left (start time is the last available time), keep the original array
    setFilteredEndTimes(newEndTimes.length > 0 ? newEndTimes : timesInRange.slice(-1));
   
    // Set the first available end time as the selected end time
    setselectedEndTime(newEndTimes[0] ||  timesInRange.slice(-1));
    calculationCost();
    
  };
  const calculationCost = () => {
    const [startHour, startMinute] = selectedStartTime.split(':').map(Number);
    const [endHour, endMinute] = selectedEndTime.split(':').map(Number);
    
   
    // Convert hours and minutes to total minutes for start and end times
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
  
    // Calculate the difference in minutes
    const durationMinutes = endTotalMinutes - startTotalMinutes;
  
    // Calculate the cost: since the rate is €10 per hour, it is €5 per 30 minutes
    // Divide the duration by 30 to get the number of half-hour increments, then multiply by €5
    const totalCost = (durationMinutes / 30) * 5;
  
    // Set the cost state
    setCost(totalCost);
  };
  
  // Call this function in the effect hook when selectedStartTime or selectedEndTime changes
  useEffect(() => {
    calculationCost();
  }, [selectedStartTime, selectedEndTime]);
  
 
  const [useruid,setUseUid] = useState('');
  useEffect(() => {
    // Get the current user from Firebase
   
    auth().onAuthStateChanged(user => {
    console.log("key ",route.route.params);
    if (user) {
      // Set displayName and photoURL in state
      console.log("user is",user )
      console.log("email",user.email)
      setUseUid(user.uid);
    
    
    }
  });


}, []);


    const startcharger =() =>{
        
        console.log("start time", selectedStartTime.split(':')[0])
        console.log("end time", selectedEndTime.split(':')[0])
        console.log("chargerid",charger)
     navigation.navigate('payment',{cost,charger,selectedStartTime,selectedEndTime})
         
    }
return(
    <View style={styles.container}>
           
                
    <TouchableOpacity 
        onPress={()=> navigation.goBack()}
    >
        <ArrowLeftIcon size="20" color="black" />
    </TouchableOpacity>

    <Text style={styles.header}>Check In</Text>

  <Text style={{margin:10}}>Duration</Text>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Text style={{margin:20}}>Start</Text>
            <Picker
              selectedValue={selectedStartTime}
              onValueChange={(itemValue) => {
                setselectedStartTime(itemValue);
                updateEndTimes(itemValue)
                console.log("itemValue",itemValue);
              } }
              style={styles.picker}
            >
              {newTimesInRange.map((time) => (
            <Picker.Item key={time} label={time} value={time} />
          ))}
            </Picker>
            <Text style={{margin:20}}>End</Text>
            <Picker
              selectedValue={selectedEndTime}
              onValueChange={(itemValue, itemIndex) => {
                setselectedEndTime(itemValue);
                calculationCost()
                console.log(itemIndex);
              } }
              style={styles.picker}
            >
              {filteredEndTimes.map((time) => (
            <Picker.Item key={time} label={time} value={time} />
          ))}
            </Picker>
           
          </View>
            
    </View>  
   <View style={{padding:30}}>
   <Text style={{textAlign:'right',fontSize:20,fontWeight:'bold'}}>{"€"+(cost)}</Text>     
   </View>
  
    <Button title="Start" onPress={startcharger} disabled={selectedStartTime===endTime}/>
        
    </View>
)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: verticalScale(20),

        alignSelf:'center'
      },
      userinput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,

        textAlignVertical: 'top',
        marginBottom:verticalScale(20)
      },
      input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        height: 250,
        textAlignVertical: 'top',
        marginBottom:verticalScale(20)
      },
      charCount: {
        fontSize: 14,
        color: '#999',
        marginBottom: verticalScale(30),
      },
      picker: {
        height: verticalScale(50),
        width: horizontalScale(120),
      },
    
  });
export default CheckIN


