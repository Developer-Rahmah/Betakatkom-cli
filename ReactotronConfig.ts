let ReactotronModule: any = null;

// grabs the ip address to connect to the physical device.
// example: http://192.168.1.21:19000/node_modules/expo/AppEntry.bundle?platform=android&dev=true&hot=false&minify=false
const { NativeModules } = require('react-native');
const { scriptURL } = NativeModules.SourceCode;
const scriptHostname = scriptURL.split('://')[1].split(':')[0];
const Reactotron = require('reactotron-react-native').default;
const { reactotronRedux } = require('reactotron-redux');

// connect and assign "Reactotron" to "ReactotronModule".
ReactotronModule = Reactotron.configure({ host: scriptHostname })
  .use(reactotronRedux())
  .useReactNative({
    storybook: true,
    reactotronRedux: true,
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /(symbolicate|logs|generate_204)/,
    },
    overlay: false, // just turning off overlay
  })
  .connect();

export default ReactotronModule;
