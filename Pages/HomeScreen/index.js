import {View, ScrollView, ActivityIndicator, Image, Alert, RefreshControl} from 'react-native';
import React, {useState, useEffect, useCallback } from 'react';
import { Container, Text, Button, Picker} from 'native-base';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    cekLogin()
  }, [])
  const [plant, setPlant] = useState("3")
  const [token, setToken] = useState(null)
	const cekLogin = async() => {
    const isLogin = await AsyncStorage.getItem('token')
    // console.log(isLogin)
		setToken(isLogin)
	}
  return (
    <Container>
      <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#d35400'}}>
        <View style={{borderBottomWidth: 1, height: "100%", justifyContent: 'center', borderColor: '#FEA82F', alignItems: 'center', flex: 1, flexDirection: 'column'}}>
          <View style={{borderWidth: 0.5, borderColor: '#FEA82F',}}>
            {/* <Text>wkkw</Text> */}
            {/* <Picker 
              mode="dropdown"
              selectedValue={plant}
              onValueChange={(value) => setPlant(value)}
              itemStyle={{marginLeft: 0}}
              itemTextStyle={{fontSize: 8}}
            >
            </Picker> */}
            {/* <Picker
              note
              mode="dropdown"
              style={{ width: 120 }}
              selectedValue={plant}
              onValueChange={(value) => setPlant(value)}
            >
              <Picker.Item label="Wallet" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </Picker> */}
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', flex: 1, backgroundColor: '#DDDDDD'}}>
        <Text>AOWKoawk</Text>
      </View>
      <View style={{height: 75, backgroundColor: '#d35400', borderTopWidth: 1, justifyContent: 'space-around', borderColor: '#FEA82F', alignItems: 'center', flexDirection: 'row', flexWrap: 'nowrap'}}>
        <TouchableOpacity style={{flexDirection: 'column', borderWidth: 0.5, borderColor: '#FEA82F', height: "75%", justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10}}>
          <Text style={{color: 'white'}}>Navigation 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'column', borderWidth: 0.5, borderColor: '#FEA82F', height: "75%", justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10}}>
          <Text style={{color: 'white'}}>Navigation 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'column', borderWidth: 0.5, borderColor: '#FEA82F', height: "75%", justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10}}>
          <Text style={{color: 'white'}}>Navigation 3</Text>
        </TouchableOpacity>
      </View>
    </Container>
  ) 
}

export default HomeScreen