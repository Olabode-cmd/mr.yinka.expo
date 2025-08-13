import { View, Text, Image } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react'
import Entypo from "@expo/vector-icons/Entypo";

const ProductDetails = () => {
    const { id } = useLocalSearchParams(); // destructuring
    const [product, setProduct] = useState();
    const [error, setError] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/product/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product")
            }

            const data = await response.json();
            setProduct(data)
        } catch(error) {
            console.error(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [id]);

    // const firstName = "Olabode";
    // const secondName = "Jr"

    // console.log('My name is ' + firstName + ' ' + secondName + '.'); //concatenation
    // console.log(`My name is ${firstName} ${secondName}.`); // template literal

    return (
      <View className="flex-1 bg-white py-4 px-4">
        <Text className="text-2xl font-bold">{product?.title}</Text>
        <Text className="text-md font-medium mt-1 text-gray-600 capitalize">
          Category: {product?.category}
        </Text>

        <View>
          <Image
            source={{ uri: product?.thumbnail }}
            className="w-[85%] mx-auto h-[350px]"
            alt="product image"
          />

          <View className="flex-row gap-x-4 justify-center">
            {product?.images.map((image: string, index: number) => {
              return (
                <View key={index} className="p-2 bg-gray-50">
                  <Image
                    source={{ uri: image }}
                    className="w-[55px] h-[55px] object-cover"
                    alt="product image"
                  />
                </View>
              );
            })}
          </View>
        </View>

        <View className="mt-4 bg-gray-100 px-2 py-2 rounded-lg flex-row items-center justify-between">
          <View>
            <Text className="text-lg mb-1 font-medium">{product?.brand}</Text>
            <Link href="/">See store</Link>
          </View>
          <View className='bg-white p-3 rounded-lg'>
            <Entypo name="chevron-right" size={24} color="black" />
          </View>
        </View>
      </View>
    );
}

export default ProductDetails;