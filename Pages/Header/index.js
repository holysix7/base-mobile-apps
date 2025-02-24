import {View, ScrollView, ActivityIndicator, Image, Alert, RefreshControl} from 'react-native'
import React, {useState, useEffect, useCallback } from 'react'
import { Container, Text, Button} from 'native-base'

const header = () => {
  return (
    <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#d35400'}}>
      <View style={{borderBottomWidth: 1, height: "100%", justifyContent: 'center', borderColor: '#FEA82F', alignItems: 'center', flex: 1, flexDirection: 'column'}}>
          <Text style={{color: 'white'}}>HR Violations Apps</Text>
      </View>
    </View>
  )
}

export default header