// jest.setup.js

jest.mock('react-native', () => {
  const actualReactNative = jest.requireActual('react-native');
  return {
    ...actualReactNative,
    Platform: {
      ...actualReactNative.Platform,
      OS: 'android', // or 'ios', depending on what you want to test
    },
  };
});
global.__DEV__ = true;
global.window = {
  // Mock properties and methods of the window object here as needed
};
import axios from 'axios';
jest.mock('react-native-gesture-handler', () => ({
    Swipeable: jest.fn(() => 'Swipeable'),
    DrawerLayout: jest.fn(() => 'DrawerLayout'),
  }));

  jest.mock('react-native/Libraries/BatchedBridge/NativeModules', () => {
    return {
      // Mock other native modules as necessary
    };
  });

  jest.mock('react-native-heroicons/solid', () => ({
    ArrowLeftIcon: 'ArrowLeftIcon',
    // Mock other icons or exports as needed
  }));
  
  // You can also mock other native modules that may cause similar issues
  jest.mock('react-native-vector-icons/FontAwesome', () => ({
    useNavigation: () => ({
      Icon: "Icon",
      // Add other navigation functions you use
    }),
    // Mock other exports as needed
  }));

   jest.mock('react-native-vector-icons/FontAwesome', () => ({
 
      Icon: "Icon",
      // Add other navigation functions you use
  
    // Mock other exports as needed
  }));
  jest.mock('@react-native-google-signin/google-signin');


  jest.mock('bottomTabs/Tabs', () => ({
    MyTabs: () => 'MyTabs',
  }));
  jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
    getEnforcing: () => ({
      getConstants: () => ({
        // Mock any constants that you need
      }),
    }),
  }));
  
  // Add this to the Jest setupFiles in your package.json or jest.config.js
  jest.mock('react-native/Libraries/Utilities/Platform', () => {
    const Platform = jest.fn('react-native/Libraries/Utilities/Platform');
    return {
      ...Platform,
      constants: {
        ...Platform.constants,
        // Mock any constants you need here
      },
    };
  });

  jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
    get: jest.fn().mockReturnValue({ width: 375, height: 667 }), // Standard iPhone dimensions
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));

  jest.mock('react-native/Libraries/StyleSheet/StyleSheet', () => {
    create: jest.fn().mockImplementation(styles => styles)
  });
  jest.mock('react-native/Libraries/StyleSheet/StyleSheet', () => ({
    create: s => s
  }));
  
  jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
    get: jest.fn().mockReturnValue({ width: 375, height: 667, scale: 2, fontScale: 2 }),
  }));
  jest.mock('react-native/Libraries/Utilities/PixelRatio', () => ({
    get: jest.fn().mockReturnValue(2),
    getFontScale: jest.fn().mockReturnValue(2),
    getPixelSizeForLayoutSize: jest.fn().mockImplementation((layoutSize) => layoutSize * 2),
    roundToNearestPixel: jest.fn().mockImplementation((layoutSize) => Math.round(layoutSize)),
  }));

  jest.mock('axios');


  

// Mocking the dependencies of ChargerMap component
jest.mock('react-native-maps', () => {
  const actualMaps = jest.fn();
  return {
    ...actualMaps,
    __esModule: true,
    default: jest.fn().mockImplementation(() => <></>),
    Marker: 'Marker',
  };
});

jest.mock('react-native-google-places-autocomplete', () => {
  return {
    GooglePlacesAutocomplete: jest.fn().mockImplementation(() => <></>),
  };
});

jest.mock('react-native-maps-directions', () => {
  return 'MapViewDirections';
});

jest.mock('react-native-get-location', () => {
  return {
    getCurrentPosition: jest.fn(() => Promise.resolve({
      latitude: 53.325529,
      longitude: -6.501184,
    })),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  
  get: jest.fn(() => ({
    SomeMethod: jest.fn(), 
    AnotherMethod: jest.fn(),
  })),
}));

jest.mock('react-native', () => {
  const actualReactNative = jest.fn();
  return Object.setPrototypeOf({
    ...actualReactNative,
    Dimensions: {
      get: jest.fn().mockReturnValue({ width: 360, height: 640 }), // Replace with any default dimensions you want to use in tests
    },
  }, actualReactNative);
});

jest.mock('react-native', () => {
  const actualReactNative = jest.fn();

  return {
    ...actualReactNative,
    Dimensions: {
      get: jest.fn().mockReturnValue({ width: 360, height: 640 }),
    },
    StyleSheet: {
      ...actualReactNative.StyleSheet,
      create: jest.fn().mockImplementation((style) => style), // Mock implementation that returns the styles as-is
    },
  };
});
jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');






jest.mock('./src/redux/Store', () => {
  Method: jest.fn(() => 'returned value') // Returns a specific value
});






jest.mock('react-native', () => ({
 
  SafeAreaView: "SafeAreaView"

}));

jest.mock('react-native-gesture-handler', () => ({
 
  GestureHandlerRootView: "GestureHandlerRootView"

}));

jest.mock('MapSCreen/CustomButtom', () => ({
 
  CustomBtn: "CustomBtn"

}));



jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: jest.fn().mockReturnValue({
      Navigator: jest.fn().mockReturnValue(null),
      Screen: jest.fn().mockReturnValue(null),
    }),
  };
});
jest.mock('@react-navigation/native-stack', () => {
  return {
    createStackNavigator: jest.fn().mockReturnValue({
      Navigator: jest.fn().mockReturnValue(null),
      Screen: jest.fn().mockReturnValue(null),
    }),
  };
});
jest.mock('@react-navigation/native', () => ({
 
  NavigationContainer: "NavigationContainer"

}));


jest.mock('react-native', () => {
  const actualReactNative = jest.fn('react-native');
  return {
    ...actualReactNative,
    Platform: {
      ...actualReactNative.Platform,
      OS: 'android',
    },
  };
});

jest.mock('@react-native-firebase/auth', () => {
  return {
    Method: jest.fn(() => 'returned user')
  };
});



jest.mock('react-native-fbsdk-next', () => ({
 
  LoginManager: "LoginManager",
  AccessToken:'AccessToken'
}));


jest.mock('react-native-paper', () => ({
 
  Avatar: "Avatar",

}));
jest.mock('react-native', () => {
  const actualReactNative = jest.fn('react-native');
  return {
    ...actualReactNative,
    StyleSheet: {
      ...actualReactNative.StyleSheet,
      create: jest.fn(style => style), 
    },
  };
});


jest.mock('@react-native-firebase/storage', () => {
  const actualReactNative = jest.fn('@react-native-firebase/storage');
  return {
    ...actualReactNative,
    Platform: {
      ...actualReactNative.Platform,
      OS: 'android', // or 'ios', depending on what you want to test
    },
  };
});

jest.mock('react-native-image-picker', () => ({
 
  CameraOptions: "CameraOptions",
  ImagePickerResponse:'ImagePickerResponse',
  launchCamera:'launchCamera',
  launchImageLibrary:'launchImageLibrary'
}));


jest.mock('@react-native-firebase/auth', () => {
  return {
    ...jest.fn('@react-native-firebase/auth'), 
    initializeAuth: jest.fn(() => ({
      Method: jest.fn(() => 'returned value') 
    })),
    getReactNativePersistence: jest.fn().mockReturnValue({
      
    }),
  };
});

