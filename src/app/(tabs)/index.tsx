import { ItemList } from '@/infraestructure/types'
import View from '@/presentation/components/ThemeView'
import { useList } from '@/presentation/context/LitsContext'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, Pressable, TextInput as RNTextInput, StyleSheet } from 'react-native'
import { HelperText, Icon, Text, TextInput } from 'react-native-paper'

const ItemHeight = 20

const Page = () => {
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const {list,addItem} = useList()
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); 

  const refTextInput = useRef<RNTextInput>()

  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      hideSubscription.remove();
    };
  }, []);

  const handleKeyboardHide = () => {
    setIsKeyboardVisible(false);
  };

  const handleItems = () => {
    if(text.length===0) {
      setError('El campo no puede estar vacío')
      return
    }
    addItem(text)
    refTextInput.current?.setNativeProps({focus:false})
    refTextInput.current?.clear()
    setText('')
    setError('')
  }  

  const renderItem = ({item}:{item:ItemList}) => {
    return ( <Text style={{fontSize:16,paddingVertical:2}}>{item.value}</Text>)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}> 
      <View style={styles.body}>
        <Pressable onPress={Keyboard.dismiss} style={{flex:1,width:'100%'}} android_disableSound>
            <TextInput 
            mode='outlined'
            label={'Añade valores'}
            value={text}
            onChangeText={setText}
            keyboardType='default'
            numberOfLines={1}
            right={<TextInput.Icon icon='plus' size={16} onPress={()=>handleItems()} />}
            onSubmitEditing={()=>handleItems()}
            />
          {error.length > 0 && <HelperText type='error' visible={error.length>0} >
            {error}
          </HelperText>}
          <FlatList 
          data={list}
          renderItem={renderItem}
          contentContainerStyle={{flex:1,alignItems:'center'}}
          keyExtractor={(item) => item.id}
          getItemLayout={(data, index) => ({length: ItemHeight, offset: ItemHeight * index, index})}        
          ListEmptyComponent={()  =>
          <View style={{alignItems:'center',flexDirection:'row',columnGap:8}}>
            <Text style={{fontSize:16,paddingVertical:16}}>No hay elementos para mostrar</Text>
            <Icon size={32} color='gray' source={'emoticon-sad'} />
          </View>}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Page

const styles = StyleSheet.create({
  body:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:16
  }
})