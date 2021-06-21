import {View, ScrollView, ActivityIndicator, Image, Alert, RefreshControl} from 'react-native'
import React, {useState, useEffect, useCallback } from 'react'
import { Container, Text, Button} from 'native-base'
import Axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage"
import approved from '../Assets/approved_orange.png'
import approved_biru from '../Assets/approved.png'
import moment from 'moment'

const ShowViolantion = ({route, navigation}) => {
  const {id, sys_plant_id, violator_id, violator_name, violator_nik, violation_time, violation_date, violation_status, violation_status_case, approve_1_by, approve_2_by, approve_3_by, enforcer_id, enforcer_name, enforcer_nik, whitness_id, whitness_name, whitness_nik, description, penalty_first_name, penalty_description, penalty_second_name, penalty_description_second} = route.params
  useEffect(() => {
    getToken()
  }, [])
	var timeNow 	                    = moment()
  const [refreshing, setRefreshing] = useState(false)
	const [loading, setLoading]       = useState(true)
  const [token, setToken]           = useState(null)
  const [penalties, setPenalties]   = useState([])

	const getToken = async() => {
    const isLogin = await AsyncStorage.getItem('token')
		setToken(isLogin)
	}
  
  const submit = (value) => {
    const approve = parseInt(value)
    const data = {
      id: id,
      user_id: violator_id,
      approve: approve
    }
    console.log(data)
		var config = {
			method: 'put',
      url: 'http://192.168.131.119:8080/v1/hrd_violations',
			headers: { 
				'Authorization': `${token}`, 
				'Content-Type': 'application/json', 
				'Cookie': '_denapi_session=ubcfq3AHCuVeTlxtg%2F1nyEa3Ktylg8nY1lIEPD7pgS3YAWwlKOxwA0S9pw7JhvZ2mNkrYl0j62wAWJWJZd7AbfolGuHCwXgEMeJH6EoLiQ%3D%3D--M%2BjBb0uJeHmOf%2B3o--%2F2Fjw57x0Fyr90Ec9FVibQ%3D%3D'
			},
			data : data
		}
    Axios(config)
    .then(function(response){
      console.log("Success Approve ", response)
      setLoading(true)
      navigation.navigate('HomeScreen')
      alert("Success Approve ", value, "!")
    })
    .catch(function(error){
      console.log(error)
    })
  }

  const functionButton = () => {
    if(approve_1_by == null && approve_2_by == null && approve_3_by == null){
      return (
        <Button style={{backgroundColor: '#d35400', borderRadius: 10}} onPress={() => submit('1')}>
          <Text>Approve 1</Text>
        </Button>
      )
    }else if(approve_1_by != null && approve_2_by == null && approve_3_by == null){
      return (
        <Button style={{backgroundColor: '#d35400', borderRadius: 10}} onPress={() => submit('2')}>
          <Text>Approve 2</Text>
        </Button>
      )
    }else if(approve_1_by != null && approve_2_by != null && approve_3_by == null){
      return (
        <Button style={{backgroundColor: '#d35400', borderRadius: 10}} onPress={() => submit('3')}>
          <Text>Approve 3</Text>
        </Button>
      )
    }else{
      null
    }
  }

  const content = () => {
    return (
      <ScrollView>
        <View style={{padding: 10, flexDirection: 'row', flex: 1}}>
          <View style={{width: '40%', height: 40, justifyContent: 'center'}}>
            <Text>Pelanggar</Text>
          </View>
          <View style={{paddingLeft: 15, height: 40, justifyContent: 'center'}}>
            <Text>:</Text>
          </View>
          <View style={{marginLeft: 15, paddingLeft: 5, backgroundColor: '#b8b8b8', borderWidth: 0.5, borderRadius: 5, width: '50%', height: 40, justifyContent: 'center'}}>
            <Text>{violator_name}</Text>
          </View>
        </View>
        <View style={{padding: 10, flexDirection: 'row', flex: 1}}>
          <View style={{width: '40%', height: 40, justifyContent: 'center'}}>
            <Text>NIK Pelanggar</Text>
          </View>
          <View style={{paddingLeft: 15, height: 40, justifyContent: 'center'}}>
            <Text>:</Text>
          </View>
          <View style={{marginLeft: 15, paddingLeft: 5, backgroundColor: '#b8b8b8', borderWidth: 0.5, borderRadius: 5, width: '50%', height: 40, justifyContent: 'center'}}>
            <Text>{violator_nik}</Text>
          </View>
        </View>
        <View style={{padding: 10, flexDirection: 'row', flex: 1}}>
          <View style={{width: '40%', height: 40, justifyContent: 'center'}}>
            <Text>Saksi</Text>
          </View>
          <View style={{paddingLeft: 15, height: 40, justifyContent: 'center'}}>
            <Text>:</Text>
          </View>
          <View style={{marginLeft: 15, paddingLeft: 5, backgroundColor: '#b8b8b8', borderWidth: 0.5, borderRadius: 5, width: '50%', height: 40, justifyContent: 'center'}}>
            <Text>{whitness_name}</Text>
          </View>
        </View>
        <View style={{padding: 10, flexDirection: 'row', flex: 1}}>
          <View style={{width: '40%', height: 40, justifyContent: 'center'}}>
            <Text>NIK Saksi</Text>
          </View>
          <View style={{paddingLeft: 15, height: 40, justifyContent: 'center'}}>
            <Text>:</Text>
          </View>
          <View style={{marginLeft: 15, paddingLeft: 5, backgroundColor: '#b8b8b8', borderWidth: 0.5, borderRadius: 5, width: '50%', height: 40, justifyContent: 'center'}}>
            <Text>{whitness_nik}</Text>
          </View>
        </View>
        <View style={{padding: 10, flexDirection: 'row', flex: 1}}>
          <View style={{width: '40%', height: 40, justifyContent: 'center'}}>
            <Text>Pemberi Hukuman</Text>
          </View>
          <View style={{paddingLeft: 15, height: 40, justifyContent: 'center'}}>
            <Text>:</Text>
          </View>
          <View style={{marginLeft: 15, paddingLeft: 5, backgroundColor: '#b8b8b8', borderWidth: 0.5, borderRadius: 5, width: '50%', height: 40, justifyContent: 'center'}}>
            <Text>{enforcer_name}</Text>
          </View>
        </View>
        <View style={{padding: 10, flexDirection: 'row', flex: 1}}>
          <View style={{width: '40%', height: 40, justifyContent: 'center'}}>
            <Text>NIK Pemberi Hukuman</Text>
          </View>
          <View style={{paddingLeft: 15, height: 40, justifyContent: 'center'}}>
            <Text>:</Text>
          </View>
          <View style={{marginLeft: 15, paddingLeft: 5, backgroundColor: '#b8b8b8', borderWidth: 0.5, borderRadius: 5, width: '50%', height: 40, justifyContent: 'center'}}>
            <Text>{enforcer_nik}</Text>
          </View>
        </View>
        <View style={{padding: 10, flexDirection: 'row', flex: 1}}>
          <View style={{width: '40%', height: 40, justifyContent: 'center'}}>
            <Text>Tanggal Pelanggaran</Text>
          </View>
          <View style={{paddingLeft: 15, height: 40, justifyContent: 'center'}}>
            <Text>:</Text>
          </View>
          <View style={{marginLeft: 15, paddingLeft: 5, backgroundColor: '#b8b8b8', borderWidth: 0.5, borderRadius: 5, width: '50%', height: 40, justifyContent: 'center'}}>
            <Text>{violation_date}</Text>
          </View>
        </View>
        <View style={{padding: 10, flexDirection: 'row', flex: 1}}>
          <View style={{width: '40%', height: 40, justifyContent: 'center'}}>
            <Text>Waktu Pelanggaran</Text>
          </View>
          <View style={{paddingLeft: 15, height: 40, justifyContent: 'center'}}>
            <Text>:</Text>
          </View>
          <View style={{marginLeft: 15, paddingLeft: 5, backgroundColor: '#b8b8b8', borderWidth: 0.5, borderRadius: 5, width: '50%', height: 40, justifyContent: 'center'}}>
            <Text>{violation_time}</Text>
          </View>
        </View>
        <View style={{padding: 10, flexDirection: 'row', flex: 1}}>
          <View style={{width: '40%', height: 60, justifyContent: 'center'}}>
            <Text>Deskripsi</Text>
          </View>
          <View style={{paddingLeft: 15, height: 60, justifyContent: 'center'}}>
            <Text>:</Text>
          </View>
          <View style={{marginLeft: 15, paddingLeft: 5, backgroundColor: '#b8b8b8', borderWidth: 0.5, borderRadius: 5, width: '50%', height: 60, justifyContent: 'center'}}>
            <Text>{description}</Text>
          </View>
        </View>
        <View style={{padding: 10, flexDirection: 'row', flex: 1}}>
          <View style={{width: '40%', height: 40, justifyContent: 'center'}}>
            <Text>Jenis Pelanggaran 1</Text>
          </View>
          <View style={{paddingLeft: 15, height: 40, justifyContent: 'center'}}>
            <Text>:</Text>
          </View>
          <View style={{marginLeft: 15, paddingLeft: 5, backgroundColor: '#b8b8b8', borderWidth: 0.5, borderRadius: 5, width: '50%', height: 40, justifyContent: 'center'}}>
            <Text>{penalty_first_name}</Text>
          </View>
        </View>
        <View style={{padding: 10, flexDirection: 'row', flex: 1}}>
          <View style={{width: '40%', height: 40, justifyContent: 'center'}}>
            <Text>Jenis Pelanggaran 2</Text>
          </View>
          <View style={{paddingLeft: 15, height: 40, justifyContent: 'center'}}>
            <Text>:</Text>
          </View>
          <View style={{marginLeft: 15, paddingLeft: 5, backgroundColor: '#b8b8b8', borderWidth: 0.5, borderRadius: 5, width: '50%', height: 40, justifyContent: 'center'}}>
            <Text>{penalty_second_name}</Text>
          </View>
        </View>
        <View style={{padding: 10, flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
          {functionButton()}
        </View>
      </ScrollView>
    )
  }

  return (
    <Container>
      <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#d35400'}}>
        <View style={{borderBottomWidth: 1, height: "100%", justifyContent: 'center', borderColor: '#FEA82F', alignItems: 'center', flex: 1, flexDirection: 'column'}}>
            <Text style={{color: 'white'}}>Violation Form</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', flex: 1, backgroundColor: '#DDDDDD'}}>
        {loading == false ? <View style={{backgroundColor: '#DDDDDD', alignItems: 'center', justifyContent: 'center', paddingTop: 100}}><ActivityIndicator size="large" color="#0000ff"/></View> : content() }
      </View>
      <View style={{height: 80, flexDirection: 'row', alignItems: 'center', backgroundColor: '#DDDDDD', justifyContent: 'space-around'}}>
          {
            approve_1_by != null ? 
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image source={approved_biru} style={{width: 50, height: 50}} /> 
              <Text>Approve 1</Text>
            </View> : 
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#DDDDDD'}}>
              <Text>Approve 1</Text>
            </View>
          } 
          {
            approve_2_by != null ? 
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image source={approved_biru} style={{width: 50, height: 50}} /> 
              <Text>Approve 2</Text>
            </View> : 
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#DDDDDD'}}>
              <Text>Approve 2</Text>
            </View>
          } 
          {
            approve_3_by != null ? 
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image source={approved_biru} style={{width: 50, height: 50}} /> 
              <Text>Approve 3</Text>
            </View> : 
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#DDDDDD'}}>
              <Text>Approve 3</Text>
            </View>
          } 
      </View>
    </Container>
  ) 
}

export default ShowViolantion