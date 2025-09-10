import { StyleSheet, TextInput, Pressable, Text, View } from "react-native";
import { useState } from 'react';
import { Link } from "expo-router";

export default function TabTwoScreen() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState();
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [success, setSuccess] = useState(false)


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const createProduct = async () => {
    setLoading(true);

    const formData = {
      title,
      price: Number(price),
      description,
      categoryId: Number(categoryId),
      images: [imageUrl]
    }

    // const formData = {
    //   title: "Test Product",
    //   price: 20,
    //   description: "A working product",
    //   categoryId: 1,
    //   images: ["https://placehold.co/600x400"],
    // };
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/products/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log(formData)

      if (!response.ok) { // 200 - 299
        console.log(response);
        throw new Error("Failed to create product");
        
      }

      const data = await response.json()
      setSuccess(true)
      console.log(data)
      // console.log(formData)
    } catch (error) {
      console.error(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <View className="flex-1">
      <Text className="text-center text-2xl mb-4">Create Product page</Text>

      <View className='px-4 space-y-4'>
        <TextInput
          placeholder="Enter product title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          className="px-2.5 py-2 rounded-md border border-gray-300"
        />

        <TextInput
          placeholder="Enter product price"
          value={price}
          onChangeText={(text) => setPrice(text)}
          className="px-2.5 py-2 rounded-md border border-gray-300"
        />

        <TextInput
          placeholder="Enter product description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          className="px-2.5 py-2 rounded-md border border-gray-300"
        />

        <TextInput
          placeholder="Enter product category id"
          value={categoryId}
          onChangeText={(text) => setCategoryId(text)}
          className="px-2.5 py-2 rounded-md border border-gray-300"
        />

        <TextInput
          placeholder="Enter product image url"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          className="px-2.5 py-2 rounded-md border border-gray-300"
        />

        <Pressable className="bg-purple-500 p-2 w-full" onPress={createProduct}>
          <Text className="text-white text-sm text-center">
            {loading ? "Creating product..." : "Create Product"}
          </Text>
        </Pressable>

        <Link href="/login">
          <Text>Go to Login page</Text>
        </Link>

        {success ? (
          <Text className="text-green-500 text-center mt-4">Product successfully created.</Text>
        ): ""}
      </View>
    </View>
  );
}
