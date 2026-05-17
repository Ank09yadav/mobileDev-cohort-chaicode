import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
const navigtion = useNavigation<any>();
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button  title="popTotop" onPress={()=>navigtion.popToTop()}></Button>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})