/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
<NavigationContainer>

{AppRegistry.registerComponent(appName, () => App)}
</NavigationContainer>

