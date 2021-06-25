import {View, ScrollView, ActivityIndicator, Image, Alert, RefreshControl} from 'react-native'
import React, {useState, useEffect, useCallback } from 'react'
import { Container, Text, Button} from 'native-base'
import Axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage"
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import CalendarBlack from '../Assets/calendar.png'
import search from '../Assets/search.png'
import check from '../Assets/check.png'
import moment from 'moment'
import HeaderContent from '../Header/index'

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    cekLogin()
  }, [])
  /**
   * Auth
   */
  const [token, setToken]           = useState(null)
  const [name, setName]             = useState(null)
  const [user, setUser]             = useState(null)
  const [pms_access, setPms]        = useState(null)
	
  
  var timeNow 	                    = moment()
  const [refreshing, setRefreshing] = useState(false);
  const [plant, setPlant]           = useState(0)
  const [data, setData]             = useState([])
	const [loading, setLoading]       = useState(true);
	const [mode, setMode]		          = useState(null)
  const [status, setStatus]         = useState(null)
	const [show, setShow]		          = useState(false)
  const [start_date, setStart]      = useState(new Date(timeNow))
  const [end_date, setEnd]          = useState(new Date(timeNow))
	var startDateText 	              = moment(start_date).format("YYYY-MM-DD") 
	var endDateText 	                = moment(end_date).format("YYYY-MM-DD")

	const cekLogin = async() => {
    const isLogin = await AsyncStorage.getItem('key')
    const user = await AsyncStorage.getItem('user')
    const name = await AsyncStorage.getItem('name')
    const pms_access = await AsyncStorage.getItem('pms_access')
		setToken(isLogin)
    setName(name)
    setUser(user)
    setPms(pms_access)
	}

  
  const logout = async() => {
    AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    .then(() => {
      navigation.replace('Login')
      alert("Successfully Logout!")
    })
  }
  
  const searchData = async() => {
    setLoading(false)
    const headers = {
      'Authorization': `${token}`, 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Cookie': '__profilin=p%3Dt'
    }
    const params = {
      'sys_plant_id': plant,
      'start_date': moment(start_date).format("YYYY-MM-DD"),
      'end_date': moment(end_date).format("YYYY-MM-DD")
    }
		Axios.get('http://192.168.131.119:8080/v1/hrd_violations', {params: params, headers: headers})
		.then(response => {
			setData(response.data.data)
			setLoading(true)
      setStatus(true)
		})
		.catch(error => {
      console.log(error)
      Alert.alert(
        "Info",
        "Silahkan Login Kembali",
        [
          { text: "OK", onPress: () => logout() }
        ],
        { cancelable: false }
      );
			setLoading(true)
      setStatus(true)
		})
  }
  
  const onChange = (event, val) => {
    const currentDate = val || start_date;
    setShow(Platform.OS === 'ios');
    setStart(currentDate)
  };

  const onChangeEnd = (event, val) => {
    const currentDate = val || end_date;
    setShow(Platform.OS === 'ios');
    setEnd(currentDate)
  };
  
  const showDateModal = () => {
    if(show == true){
      if(mode == 'start-date'){
        return (
          <DateTimePicker
            testID="dateTimePicker"
            value={start_date}
            maximumDate={end_date}
            mode={mode}
            is24Hour={true}
            display="calendar"
            onChange={(evt, val) => onChange(evt, val)}
          />
        )
      }else{
        return (
          <DateTimePicker
            testID="dateTimePicker"
            maximumDate={new Date(timeNow)}
            minimumDate={start_date}
            value={end_date}
            mode={mode}
            is24Hour={true}
            display="calendar"
            onChange={(evt, val) => onChangeEnd(evt, val)}
          />
        )
      }
    }
  }

  const functionUpdateMode = (value) => {
    if(value == 1){
      showDate('start-date')
    }else{
      showDate('end-date')
    }
  }
  
  const showDate = (val) => {
    setShow(true)
    setMode(val)
  }
  
  const dateFunction = () => {
    if(plant > 0){
      return(
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', borderWidth: 0.5, borderColor:'#FEA82F', height: 40, width: 150, paddingRight: 5, margin: 5, justifyContent: 'space-around', alignItems: 'center'}}>
            <View style={{flexDirection: 'column', paddingLeft: 5, flex: 1}}>
              <Text onPress={() => functionUpdateMode(1)}>{startDateText != null ? startDateText : 'Pilih'}</Text>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'flex-end', width: 35, paddingTop: 2}}>
              <TouchableOpacity onPress={() => functionUpdateMode(1)}>
                <Image source={CalendarBlack} style={{width: 25, height: 25, marginLeft: 4}}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row', borderWidth: 0.5, borderColor:'#FEA82F', height: 40, width: 150, paddingLeft: 5, margin: 5, justifyContent: 'space-around', alignItems: 'center'}}>
            <View style={{flexDirection: 'column', paddingLeft: 5, flex: 1}}>
              <Text onPress={() => functionUpdateMode(2)}>{endDateText != null ? endDateText : 'Pilih'}</Text>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'flex-end', width: 35, paddingTop: 2}}>
              <TouchableOpacity onPress={() => functionUpdateMode(2)}>
                <Image source={CalendarBlack} style={{width: 25, height: 25, marginLeft: 4}}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row', height: 40, width: 80, paddingLeft: 5, margin: 5, justifyContent: 'space-around', alignItems: 'center'}}>
            <Button style={{backgroundColor: '#F7A440', borderRadius: 15, height: 40, width: 45, justifyContent: 'center'}} onPress={() => searchData()}>
              <Image source={search} style={{width: 25, height: 25, marginLeft: 2}}/>
            </Button>
          </View>
          
          {showDateModal()}
          
        </View>
      )
    }else{
      return(
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{borderWidth: 0.5, borderColor:'#FEA82F', height: 40, width: 150, paddingLeft: 5, margin: 5, justifyContent: 'center', backgroundColor: '#b8b8b8', borderRadius: 5}} onPress={() => alert("Silahkan pilih plant terlebih dahulu")}>
            <Text>Pilih</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth: 0.5, borderColor:'#FEA82F', height: 40, width: 150, paddingLeft: 5, margin: 5, justifyContent: 'center', backgroundColor: '#b8b8b8', borderRadius: 5}} onPress={() => alert("Silahkan pilih plant terlebih dahulu")}>
            <Text>Pilih</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', height: 40, width: 80, paddingLeft: 5, margin: 5, justifyContent: 'space-around', alignItems: 'center'}}>
            <Button style={{backgroundColor: '#F7A440', borderRadius: 15, height: 40, width: 45, justifyContent: 'center'}} onPress={() => alert("Silahkan pilih plant terlebih dahulu")}>
              <Image source={search} style={{width: 25, height: 25, marginLeft: 2}}/>
            </Button>
          </View>
        </View>
      )
    }
  }

  const onRefresh = () => {
    setRefreshing(false)
    searchData()
  }

  const content = () => {
    const arrData = []
    if(status != null){
      if(data.length > 0){
        data.map((val, key) => {
          // const childData = []
          // val.image.map((el) => {
          //   const object = {
          //     id: el.id,
          //     base64_full: el.base64_full
          //   }
          //   childData.push(object)
          // })
          arrData.push(
            <Button key={key} style={{marginTop: 10, alignItems: 'center', width: 350, borderRadius: 10, backgroundColor: '#F7A440', flexDirection: 'row'}} onPress={() => {
              navigation.navigate('ShowViolation', {
                id: val.id,
                sys_plant_id: val.sys_plant_id,
                violator_id: val.violator_id,
                violator_name: val.violator_name,
                violator_nik: val.violator_nik,
                violation_time: val.violation_time,
                violation_date: val.violation_date,
                violation_status: val.violation_status,
                violation_status_case: val.violation_status_case,
                approve_1_by: val.approve_1_by,
                approve_2_by: val.approve_2_by,
                approve_3_by: val.approve_3_by,
                enforcer_id: val.enforcer_id,
                enforcer_name: val.enforcer_name,
                enforcer_nik: val.enforcer_nik,
                whitness_id: val.whitness_id,
                whitness_name: val.whitness_name,
                whitness_nik: val.whitness_nik,
                description: val.description,
                penalty_first_name: val.penalty_first_name,
                penalty_description: val.penalty_description,
                penalty_second_name: val.penalty_second_name,
                penalty_description_second: val.penalty_description_second,
                // childData: childData,
                start_date: moment(start_date).format("YYYY-MM-DD"),
                end_date: moment(end_date).format("YYYY-MM-DD")
              })
            }}>
              <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={{color: 'black'}}>{val.violator_name}</Text>
                <Text style={{color: 'black'}}>{val.violator_nik}</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end'}}>
                <Text style={{color: 'black'}}>{val.violation_time}</Text>
                <Text style={{color: 'black'}}>{val.violation_date}</Text>
              </View>
              { 
                val.approve_3_by != null ?
                <View style={{width: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={check} style={{width: 35, height: 35}} />
                </View> :
                null
              }
            </Button>
          )
        })
      }else{
        Alert.alert(
          "Info",
          "Tidak ada data pada tanggal tersebut",
          [
            { text: 'OK' }
          ],
          {cancelable: true}
        )
        setStatus(null)
      }
    }else{
      // console.log('Tidak ada data')
    }
    return arrData
  }

  return (
    <Container>
      <View>
        <HeaderContent />
      </View>
      <View style={{flexDirection: 'row', flex: 1, backgroundColor: '#DDDDDD'}}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', borderWidth: 0.5, borderColor:'#FEA82F', height: 40, flex: 1, margin: 5, justifyContent: 'center'}}>
              <Picker
                selectedValue={plant}
                style={{ height: 40, width: 400, color: 'black' }}
                itemStyle={{height: 20}}
                onValueChange={(itemValue, itemIndex) => setPlant(itemValue)}
              >
                <Picker.Item label="Pilih" value="0" />
                <Picker.Item label="TSSI" value="3" />
                <Picker.Item label="Techno (KB)" value="2" />
              </Picker>
            </View>
          </View>
          {dateFunction()}
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              {loading == false ? <View style={{backgroundColor: '#DDDDDD', alignItems: 'center', justifyContent: 'center', paddingTop: 100}}><ActivityIndicator size="large" color="#0000ff"/></View> : content() }
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={{height: 75, backgroundColor: '#d35400', borderTopWidth: 1, justifyContent: 'space-around', borderColor: '#FEA82F', alignItems: 'center', flexDirection: 'row', flexWrap: 'nowrap'}}>
        <TouchableOpacity style={{flexDirection: 'column', borderWidth: 0.5, borderColor: '#FEA82F', height: "75%", justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10}}>
          <Text style={{color: 'white'}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'column', borderWidth: 0.5, borderColor: '#FEA82F', height: "75%", justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10}} onPress={() => navigation.navigate('AddViolation', {
          sys_plant_id: plant
        })} >
          <Text style={{color: 'white'}}>Add Violation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'column', borderWidth: 0.5, borderColor: '#FEA82F', height: "75%", justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10}} onPress={() => navigation.navigate('Profile', {
          sys_plant_id: plant,
          staff_name: name,
          staff_nik: user,
          staff_pms_access: pms_access
        })}>
          <Text style={{color: 'white'}}>Profile</Text>
        </TouchableOpacity>
      </View>
    </Container>
  ) 
}

export default HomeScreen