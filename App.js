import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-community/picker';
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [editingExpenseId, setEditingExpenseId] = useState(null); // Track the ID of the expense being edited

 
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

 const addExpense = () => {
  if (title !== '' && price !== '') {
    const parsedPrice = parseFloat(price);

    if (isNaN(parsedPrice)) {
      // Show alert if price is not a valid number
      alert('Please enter a valid price.');
      return;
    }

    const newExpense = {
      id: expenseList.length + 1,
      title,
      price: parsedPrice,
      date: new Date().toLocaleString(),
    };
    setExpenseList([...expenseList, newExpense]);
    setTotalExpenditure(totalExpenditure + parsedPrice);
    setTitle('');
    setPrice('');
  }
};


  const renderExpenseItem = ({ item }) => {
    const isEditing = item.id === editingExpenseId; // Check if the current item is being edited
    const itemBackgroundColor = isEditing ? '#FFFF00' : (darkMode ? '#000000' : '#ffffff');
    const itemTextStyle = {
      color: isEditing ? '#000000' : (darkMode ? '#ffffff' : '#000000'),
    };

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, backgroundColor: itemBackgroundColor }}>
        <View style={{ flexDirection: 'column' }}>
      <Text style={itemTextStyle}>
        {item.id}:      {item.title}                ${item.price}
      </Text>
      <Text style={itemTextStyle}>{item.date}</Text>
    </View>
        {isEditing ? ( // Render Save button if editing mode is enabled for this item
          <TouchableOpacity onPress={() => saveExpenseChanges(item.id)} style={{ padding: 5 }}>
            <Text style={itemTextStyle}>Save</Text>
          </TouchableOpacity>
        ) : ( // Render Edit button if editing mode is not enabled for this item
          <TouchableOpacity onPress={() => startEditingExpense(item.id)} style={{ padding: 5 }}>
          
            <Text style={itemTextStyle}>Edit</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteExpense(item.id)} style={{ padding: 5 }}>
        <MaterialCommunityIcons name="delete" size={20}  style={itemTextStyle} />
          
        </TouchableOpacity>
      </View>
    );
  };

  const startEditingExpense = (expenseId) => {
    const expenseToEdit = expenseList.find((item) => item.id === expenseId);
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setPrice(expenseToEdit.price.toString());
      setEditingExpenseId(expenseId); // Set the editingExpenseId state to enable editing mode
    }
  };

  const saveExpenseChanges = (expenseId) => {
    const expenseToSave = expenseList.find((item) => item.id === expenseId);
    if (expenseToSave) {
      const updatedExpenseList = expenseList.map((item) => {
        if (item.id === expenseId) {
          return {
            ...item,
            title,
            price: parseFloat(price),
          };
        }
        return item;
  });
  setExpenseList(updatedExpenseList);
  setEditingExpenseId(null); // Reset editingExpenseId to disable editing mode

  // Recalculate the total expenditure
  const updatedTotalExpenditure = updatedExpenseList.reduce((total, expense) => total + expense.price, 0);
  setTotalExpenditure(updatedTotalExpenditure);
}
};

const deleteExpense = (expenseId) => {
  const expenseToDelete = expenseList.find((item) => item.id === expenseId);
  if (expenseToDelete) {
    const updatedExpenseList = expenseList.filter((item) => item.id !== expenseId);
    setExpenseList(updatedExpenseList);
    setTotalExpenditure(totalExpenditure - expenseToDelete.price);

    // Show alert indicating the item has been deleted
    alert(`Item "${expenseToDelete.title}" has been deleted.`);
  }
};


return (
<View style={[styles.container, { backgroundColor: darkMode ? '#000000' : '#ffffff' }]}>
<Text style={[styles.title, { color: darkMode ? '#ffffff' : '#000000' }]}>Expenses Log</Text>
<View style={styles.darkModeContainer}>
<Text  style={[styles.darkModeText, { color: darkMode ? '#ffffff' : '#000000' }]}>Dark Mode</Text>
<Switch value={darkMode} onValueChange={toggleDarkMode} />
</View>
<View style={styles.pickerContainer}>
<Picker
 style={styles.picker}
selectedValue={month}
onValueChange={(itemValue) => setMonth(itemValue)}
>
          <Picker.Item label="January" value="January" />
          <Picker.Item label="February" value="February" />
          <Picker.Item label="April" value="April" />
          <Picker.Item label="May" value="May" />
          <Picker.Item label="June" value="June" />
          <Picker.Item label="July" value="July" />
          <Picker.Item label="August" value="August" />
          <Picker.Item label="September" value="September" />
          <Picker.Item label="October" value="October" />
          <Picker.Item label="November" value="November" />
          <Picker.Item label="December" value="December" />
          {/* Add other month options */}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={year}
          onValueChange={(itemValue) => setYear(itemValue)}
        >
          <Picker.Item label="2023" value="2023" />
          <Picker.Item label="2024" value="2024" />
          <Picker.Item label="2025" value="2025" />
          <Picker.Item label="2026" value="2026" />
          <Picker.Item label="2027" value="2027" />
          <Picker.Item label="2028" value="2028" />
          <Picker.Item label="2029" value="2029" />
          <Picker.Item label="2030" value="2030" />
         
{/* Add other year options */}
</Picker>
</View>

<View style={styles.textInputContainer}>
<TextInput
placeholder="Item"
value={title}
onChangeText={(text) => setTitle(text)}
 style={[styles.textInput1, { color: darkMode ? '#ffffff' : '#000000' }]}
/>
<TextInput
placeholder="Price"
value={price}
onChangeText={(text) => setPrice(text)}
keyboardType="numeric"
style={[styles.textInput2, { color: darkMode ? '#ffffff' : '#000000' }]}
/>

</View>
{editingExpenseId === null ? ( // Render Add Expense button if not in editing mode
<Button title="Add Expense" onPress={addExpense} disabled={title === '' || price === ''} />
) : ( // Render Edit Expense button if in editing mode
<Button title="Update Expense" onPress={() => saveExpenseChanges(editingExpenseId)} disabled={title === '' || price === ''} />
)}
<Text style={[styles.totalExpenditureText, { color: darkMode ? '#ffffff' : '#000000' }]}>
Total Expenditure:                        ${totalExpenditure.toFixed(2)}
</Text>
<FlatList
data={expenseList}
renderItem={renderExpenseItem}
keyExtractor={(item) => item.id.toString()}
/>
</View>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 26,
    marginBottom: 16,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },

    darkModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
  },

  darkModeText: {
    marginRight: 8,
    fontSize: 16,
    
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    
  },
  picker: {
    flex: 1,
    height: 40,
    color: '#000000',
    
    backgroundColor:"#588157",
    margin:8
  },

  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },

  textInput1: {
    marginBottom: 16,
    marginLeft:4,
    borderBottomColor: "green",
    paddingBottom: 8,
    borderBottomWidth: 3,
   
    width:"70%"
  },


    textInput2: {
    marginBottom: 16,
    marginLeft:4,
    borderBottomColor: "green",
    paddingBottom: 8,
    borderBottomWidth: 3,
    width:"30%"
  },

  totalExpenditureText: {
  marginTop: 16,
  marginBottom: 8,
  fontSize: 16,
  
},


  


  

  
  // Other styles
});

export default App;
