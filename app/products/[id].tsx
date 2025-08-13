import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react'

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
        <View className='flex-1 bg-white'>
            <Text>Product Details for product {id}</Text>
            <Text>{product?.title}</Text>
        </View>
    )
}

export default ProductDetails;