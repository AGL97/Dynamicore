import { useList } from '@/presentation/context/LitsContext';
import { useSegments } from 'expo-router';
import * as React from 'react';
import { Appbar } from 'react-native-paper';

interface Props  {
  title:string
}

const Header : React.FC<Props> = ({title}) => {
  const segments = useSegments();
  const {clearlist} = useList()  
  
  return <Appbar.Header>
    <Appbar.Content title={title}  />
    {segments.length === 1 && segments[0] === '(tabs)' && <Appbar.Action icon='eraser' onPress={()=>clearlist()} />}
  </Appbar.Header>
};

export default Header;