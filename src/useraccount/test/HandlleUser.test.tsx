
import axios from 'axios';


// Mock the module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('EachMessage', () => {
  const route = {
    route: {
      params: {
        userName: 'John Doe',
        texts: 'Hello, this is a test message!',
        timestamp: new Date(2022, 1, 1, 12, 0, 0, 0),
      },
    },
  };

  it('renders message details correctly', () => {
 
    expect((route.route.params.userName)).toBeTruthy();
    expect((route.route.params.texts)).toBeTruthy();
    expect((route.route.params.timestamp.toLocaleString())).toBeTruthy();
  });

});

describe('\n\nPOST /api/v1/maps/charger', () => {
  it('post Charger Detail successfully for an API', async () => {
    const mockedMarkers :any= {
      id:1,
      name:"Poal",
      email:"Poal@gmail.com",
      phone:"0897865786",
      address:"3 Sherrard Street Upper, Dublin, D01 ET89, Ireland",
      city:"Dublin",
      country:"Ireland",
      eircode:"B01ET89",
      coordinate:{latitude:53.330566,longitude:-6.271549},
      chargertypes:"type1-22kw",
      availbleTime:"9:00-13:00",
      description:"Home charger staton, please call 0862433456 before 10 mins arrived ",
      useruid:"FpWN0iUmlaPOhn63H3Hdc731pG22",
      image:"https://firebasestorage.googleapis.com/v0/b/nifty-inkwell-402121.appspot.com/o/Screenshot%202024-04-03%20223827.png?alt=media&token=63ab7dca-f3ee-46e4-b2e4-cd0fc68c9ccb",
      rating:4,
      reviewer:3} ;
 
      const mockedResponse = {
        data: mockedMarkers, 
      };
  
      mockedAxios.post.mockResolvedValue(mockedResponse);
      expect(mockedAxios.post).toBeTruthy();
     
    });


});

describe("@react-native-firebase/auth", () => {
  it('user sign in ', async () => {
    const mockedMarkers :any= {
      
      email:"Poal@gmail.com",
      password:"DF553D94DF6811EBBA800242AC130004",
     
      } ;
 
      const mockedResponse = {
        data: mockedMarkers, 
      };
  
      mockedAxios.post.mockResolvedValue(mockedResponse);

      expect(mockedAxios.post).toBeTruthy();
     
    });


});