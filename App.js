import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/Views/Home';


export default function App() {
  /*
  const [Comic, setComic] = useState([])

  const get = async() =>{
    let x = await getComic(2)
    setComic(x)
  }
  
  useEffect(() => {
    get()
   console.log(Comic)
}, [])*/


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Home></Home>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
