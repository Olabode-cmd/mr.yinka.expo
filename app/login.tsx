import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
      const formData = {
        username: username,
        password: password,
      };

      // const token = AsyncStorage.getItem('accessToken')
      try {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData), // converting the formData object into JSON
        });

        if (!response.ok) { // checking if response is ok meaning between 200 and 299
          throw new Error("Failed to login. try again later");
        }

        const data = await response.json(); // parse response as JSON
        // console.log(data)
        AsyncStorage.setItem("accessToken", data.accessToken);
        AsyncStorage.setItem("refreshToken", data.refreshToken);
      } catch (error) {
        console.error('Error logging in', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    return (
        <View className="flex-1">
            <Text>Login to your account</Text>

            <View>
                <Text>Username</Text>
                <TextInput 
                    placeholder='Username'
                    value={username}
                    className='border border-gray-300 rounded-md p-2 mb-4'
                    onChangeText={(text) => setUsername(text)}
                />
                <Text>Password</Text>
                <TextInput
                    placeholder='Password'
                    value={password}
                    secureTextEntry
                    className='border border-gray-300 rounded-md p-2 mb-4'
                    onChangeText={(text) => setPassword(text)}
                />

                <Pressable onPress={handleSubmit}>
                    <Text className="text-center text-white bg-blue-500 p-3 rounded-md">
                        {loading ? <ActivityIndicator /> : "Login"}
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Login;

// To store something in AsyncStorage, we can do AsyncStorage.setItem("accessToken", data.accessToken)

// To get something in AsyncStorage, we can do AsyncStorage.getItem("accessToken")

// To remove something from AsyncStorage, we can do AsyncStorage.removeItem("accessToken")