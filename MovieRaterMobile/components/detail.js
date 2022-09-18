import { StyleSheet, Text, View, Button, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Detail(props) {

  const movie = props.navigation.getParam('movie', null); // default is null
  const token = props.navigation.getParam('token', '');
  const [ highlight, setHighlight] = useState(0);

  const rateClicked = () => {
    if (highlight > 0 & highlight < 6) {
      fetch(`http://192.168.1.45:8000/api/movies/${movie.id}/rate_movie/`, {
          method: 'POST',
          headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ stars: highlight })
      })
      .then( response => response.json() )
      .then( response => {
        setHighlight(0);
        Alert.alert("Rating", response.message)
      } )
      .catch( error => Alert.alert("Error", error) )
    }
  }

  return (
    <View style={styles.container}>
      <Text>{movie.title}</Text>
        <View style={styles.starContainer}>
          <FontAwesomeIcon style={movie.avg_rating > 0 ? styles.orange : styles.white} icon={ faStar }/>
          <FontAwesomeIcon style={movie.avg_rating > 1 ? styles.orange : styles.white} icon={ faStar }/>
          <FontAwesomeIcon style={movie.avg_rating > 2 ? styles.orange : styles.white} icon={ faStar }/>
          <FontAwesomeIcon style={movie.avg_rating > 3 ? styles.orange : styles.white} icon={ faStar }/>
          <FontAwesomeIcon style={movie.avg_rating > 4 ? styles.orange : styles.white} icon={ faStar }/>
          <Text style={styles.white}>({movie.avg_rating})</Text>
        </View>
      <Text style={styles.description}>{movie.description}</Text>

      <View style={{borderBottomColor: 'white', borderBottomWidth: 2}} />
      <Text style={styles.description}>Rate it!!!</Text>

      <View style={styles.starContainer}>
        <Pressable onPress={()=> setHighlight(1)}>
          <FontAwesomeIcon style={highlight > 0 ? styles.purple : styles.grey} icon={ faStar } size={48}/>
        </Pressable>
        <Pressable onPress={()=> setHighlight(2)}>
          <FontAwesomeIcon style={highlight > 1 ? styles.purple : styles.grey} icon={ faStar } size={48}/>
        </Pressable>
        <Pressable onPress={()=> setHighlight(3)}>
          <FontAwesomeIcon style={highlight > 2 ? styles.purple : styles.grey} icon={ faStar } size={48}/>
        </Pressable>
        <Pressable onPress={()=> setHighlight(4)}>
          <FontAwesomeIcon style={highlight > 3 ? styles.purple : styles.grey} icon={ faStar } size={48}/>
        </Pressable>
        <Pressable onPress={()=> setHighlight(5)}>
          <FontAwesomeIcon style={highlight > 4 ? styles.purple : styles.grey} icon={ faStar } size={48}/>
        </Pressable>
      </View>

      <Button title="Rate" onPress={ () => rateClicked() }/>
    </View>
  );
}

Detail.navigationOptions = screenProps => ({ 
  title: screenProps.navigation.getParam('title', 'no name'),
  headerStyle: {
    backgroundColor: 'orange'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24
  },
  headerRight: () => 
    <Button title="Edit" color="white" 
      onPress={ () => screenProps.navigation.navigate("Edit", {movie: screenProps.navigation.getParam("movie"), token: screenProps.navigation.getParam("token")}) }
    />
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding: 10
  },
  title: {
    fontSize: '50em',
  },
  item: {
    flex: 1,
    padding: 10,
    height: 50,
    backgroundColor: '#282C35',
    width: '100%'
  },
  itemText: {
    flex: 1,
    fontSize: 24,
    width: '100%'
  },
  description: {
    fontSize: 20,
    color: 'white',
    padding: 10
  },
  starContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  orange: {
    color: 'orange'
  },
  white: {
    color: 'white'
  },
  purple: {
    color: 'purple'
  },
  grey: {
    color: 'grey'
  }
});
