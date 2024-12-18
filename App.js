
import { useState } from 'react';
import { StyleSheet,View,FlatList,Button} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() { 
const [courseGoals, setCourseGoals] = useState([]);
const [modalVisible,setModalVisible] = useState(false);

function startAddGoalHandler(){
setModalVisible(true);
}

function endAddGoalHandler(){
  setModalVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
   setCourseGoals((currentCoureseGoals) => [...currentCoureseGoals,{text:enteredGoalText,id:Math.random().toString()}]);
   setModalVisible(false);
  };

  function deleteGoalHandler(id){
setCourseGoals(
  (currentCoureseGoals) =>{
    return currentCoureseGoals.filter((goal)=> goal.id !== id)
  }
)
  }
  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.appContainer}>
      <Button title='Add New Goal' 
      color="#5e0acc" 
      onPress={startAddGoalHandler}/>
  <GoalInput visible = {modalVisible} onAddGoal = {addGoalHandler} endGoal = {endAddGoalHandler}/>
    <View style = {styles.goalsContainer}> 
    <FlatList data={courseGoals} 
    renderItem={(itemData) => {
      return <GoalItem 
      text = {itemData.item.text} 
      id = {itemData.item.id}
      onDeleteItem = {deleteGoalHandler}/>;
    }} 
    keyExtractor={(item,index)=>{
return item.id;
    }}
    alwaysBounceVertical = {false}/>  
    </View>    
    </View>
    </>
  ); 
}

const styles = StyleSheet.create({
 appContainer:{
  flex: 1,
  paddingTop: 50,
  paddingHorizontal: 16,
  backgroundColor: '#1e085a'
 },
 goalsContainer: {
  flex: 4
 },
 
});
