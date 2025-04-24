import Header from '@/presentation/components/ui/Header'
import { Stack } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <Stack screenOptions={{
      header:(props) => <Header title={props.options.title ?? ''}  />,
    }}>
        <Stack.Screen name="index" options={{ title: 'Permisos' }} />
        <Stack.Screen name="map" options={{headerShown:false}} />
    </Stack>
  )
}

export default Layout