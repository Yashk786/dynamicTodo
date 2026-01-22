import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@todos_storage";

export const saveTodos = async (todos) => {
  try {
    const jsonData = JSON.stringify(todos);
    await AsyncStorage.setItem(STORAGE_KEY, jsonData);
  } catch (error) {
    console.log(error);
  }
};

export const loadTodos = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
