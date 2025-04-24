import View from '@/presentation/components/ThemeView'
import * as Location from 'expo-location'
import { PermissionStatus } from 'expo-location'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { Button, Chip, Text } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

type PermissionsText = 'Permiso concedido' | 'Permiso denegado' | 'Permiso indefinido'

interface PermissionsPayload {
  icon:IconSource,
  information:PermissionsText
  status:PermissionStatus
}

const Permissions : Record<PermissionStatus,PermissionsPayload> = {
  [PermissionStatus.GRANTED]: {
    icon: 'check-circle',
    information: 'Permiso concedido',
    status:PermissionStatus.GRANTED
  },
  [PermissionStatus.DENIED]: {
    icon: 'cancel',
    information: 'Permiso denegado',
    status:PermissionStatus.DENIED
  },
  [PermissionStatus.UNDETERMINED]:{
    icon: 'information',
    information: 'Permiso indefinido',
    status:PermissionStatus.UNDETERMINED
  },
}

const Page = () => {
  const [permission, setPermission] = useState<PermissionsPayload>(Permissions[PermissionStatus.UNDETERMINED])

  const requestPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      setPermission(Permissions[status])
      
    } catch (error) {
      const newError = error as Error;
      Alert.alert('Error', `Error inesperado ${newError.message}`);
    }
  }  

  return (
    <View style={styles.body}>
      <Text variant='titleLarge'>Para acceder al mapa necesita facilitar permisos de ubicación</Text>
      <View style={{rowGap:16}}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <Text variant='titleMedium'>Estado actual: </Text>
          <Chip mode='flat' icon={permission.icon} textStyle={{fontSize:16}} >{permission.information}</Chip>       
        </View>
        <View style={{rowGap:8}}>
          <Button mode='contained' icon='google-maps' onPress={requestPermission} disabled={permission.status === PermissionStatus.GRANTED}> 
            Solicitar 
          </Button>
          {permission.status === PermissionStatus.GRANTED && (<Link href={'/(tabs)/(second)/map'} asChild push>
            <Button mode='contained' icon='map'> 
              Ir al mapa 
            </Button>
          </Link>)}
        </View>
      </View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
    body:{
        flex:1,
        justifyContent:'space-evenly',
        alignItems:'center'
    }    
})