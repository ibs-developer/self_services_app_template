import { View, Text } from 'react-native'
import React from 'react'
import NavigateHeder from '@/components/reusable/navigationHeader'

const Expenses = () => {
  return (
    <View className="flex-1 bg-background">
      <NavigateHeder title='Expenses' />
    </View>
  )
}

export default Expenses