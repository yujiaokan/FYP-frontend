// __mocks__/@react-native-google-signin/google-signin.js

module.exports = {
    GoogleSignin: {
      configure: jest.fn(),
      signIn: jest.fn(() => Promise.resolve({
        // Mock the return value of signIn method if needed
        user: {
          id: 'mockUserId',
          email: 'test@example.com',
          // ... other user properties
        },
      })),
      
    },
  
  };
  