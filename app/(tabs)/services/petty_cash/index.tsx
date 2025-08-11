import { View, Text } from 'react-native'
import React from 'react'
import NavigateHeder from '@/components/reusable/navigationHeader'

const PettyCash = () => {
  return (
    <View className="flex-1 bg-background">
      <NavigateHeder title='Petty cash' />
    </View>
  )
}

export default PettyCash