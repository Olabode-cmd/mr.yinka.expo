import { StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from "expo-router";


import { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function TabOneScreen() {
  const [products, setProducts] = useState<Product[] | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [refreshing, setRefreshing] = useState(false)

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  })

  if (loading) {
    return (
      <View className='flex-1 bg-white'>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className='flex-1 bg-white'>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }


  return (
    // <ScrollView className='bg-white flex-1'>
    //   {products.map((product: Product) => (
    //     <Link
    //       href={`/products/${product.id}`}
    //       key={product.id}
    //       style={{ marginBottom: 20 }}
    //     >
    //       <Image
    //         source={{ uri: product.thumbnail }}
    //         style={{ width: 100, height: 100 }}
    //       />
    //       <View className='bg-white text-black'>
    //         <Text className='text-black text-2xl'>{product.title}</Text>
    //         <Text>{product.description}</Text>
    //         <Text>Price: ${product.price}</Text>
    //       </View>
    //     </Link>
    //   ))}
    // </ScrollView>

    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={fetchProducts}
        renderItem={({ item }) => (
        <Link
          href={`/products/${item.id}`}
          style={{ marginBottom: 20 }}
        >
          <Image
            source={{ uri: item.thumbnail }}
            style={{ width: 100, height: 100 }}
          />
          <View className='bg-white text-black'>
            <Text className='text-black text-2xl'>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Price: ${item.price}</Text>
          </View>
        </Link>
        )}
      />
    </View>
  );
}
