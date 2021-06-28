import {View, ScrollView, ActivityIndicator, TextInput, Image, Alert, RefreshControl} from 'react-native'
import React, {useState, useEffect, useCallback } from 'react'
import { Container, Text, Button} from 'native-base'
import Axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage"
import { Picker } from '@react-native-picker/picker'
import approved from '../Assets/approved_orange.png'
import approved_biru from '../Assets/approved.png'
import cameraIcons from '../Assets/cameraicon.png'
import moment from 'moment'
import Autocomplete from 'react-native-autocomplete-input'
import DateTimePicker from '@react-native-community/datetimepicker'
import { white } from 'chalk'
import {launchCamera} from 'react-native-image-picker';

const AddViolation = ({route, navigation}) => {
  const {sys_plant_id, id, name, nik} = route.params
  useEffect(() => {
    getSysAccount()
    getPenalties()
  }, [])
	var timeNow 	                    = moment()
  const [refreshing, setRefreshing] = useState(false)
  const [tokenDua, setToken]        = useState(null)
	const [loading, setLoading]       = useState(false)
  const [users, setUsers]           = useState([])
  const [penalties, setPenalties]   = useState([])
  const [find, setFind]             = useState({})
	const [show, setShow]		          = useState(false)
	const [showTime, setShowTime]		  = useState(false)
	const [item_image, setItemImage]	= useState([])
	const [indexImage, setIndexImage]	= useState(0)
  /**
   * Parameter
   */
  const time = moment(timeNow).format("HH:mm")
  const [violator_id, setViolator]                                = useState(null)
  const [violator_nik, setViolatorNik]                            = useState(null)
  const [enforcer_id, setEnforcer]                                = useState(null)
  const [enforcer_nik, setEnforcerNik]                            = useState(null)
  const [whitness_id, setWhitness]                                = useState(null)
  const [whitness_nik, setWhitnessNik]                            = useState(null)
  const [description, setDescription]                             = useState(null)
  const [violation_time, setViolationTime]                        = useState(timeNow)
  const [violation_date, setViolationDate]                        = useState(new Date(timeNow))
  const [penalty_first_id, setPenaltyFirst]                       = useState(null)
  const [penalty_description, setPenaltyFirstDescription]         = useState(null)
  const [penalty_second_id, setPenaltySecond]                     = useState(null)
  const [penalty_description_second, setPenaltySecondDescription] = useState(null)

  /**
   * Show Item
   */
  var maxDate                               = new Date(timeNow)
  var violationDateText 	                  = moment(violation_date).format("YYYY-MM-DD") 
  var violationTimeText 	                  = moment(violation_time).format("HH:mm") 

  const getSysAccount = async() => {
    const token = await AsyncStorage.getItem('key')
    setToken(token)
    setLoading(false)
    const headers = {
      'Authorization': `${token}`, 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Cookie': '__profilin=p%3Dt'
    }
		Axios.get('http://192.168.131.119:8080/v1/auths/sysaccount', {headers: headers})
		.then(response => {
			setUsers(response.data.data)
			setLoading(true)
		})
		.catch(error => {
      console.log(error)
      Alert.alert(
        "Error",
        "Hubungi IT Department",
        [
          { text: "OK", onPress: () => console.log('Stop API') }
        ],
        { cancelable: false }
      );
			setLoading(true)
		})
  }

  const getPenalties = async() => {
    const token = await AsyncStorage.getItem('key')
    setLoading(false)
    const headers = {
      'Authorization': `${token}`, 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Cookie': '__profilin=p%3Dt'
    }
		Axios.get('http://192.168.131.119:8080/v1/getpenalties', {headers: headers})
		.then(response => {
			setPenalties(response.data.data)
			setLoading(true)
		})
		.catch(error => {
      console.log(error)
      Alert.alert(
        "Error",
        "Hubungi IT Department",
        [
          { text: "OK", onPress: () => console.log('Stop API') }
        ],
        { cancelable: false }
      );
			setLoading(true)
		})
  }

  const submit = async() => {
    setLoading(false)
    const token = await AsyncStorage.getItem('key')
    const data = {
      sys_plant_id: sys_plant_id,
      penalty_first_id: penalty_first_id,
      penalty_description: penalty_description,
      penalty_description_second: penalty_description_second,
      penalty_second_id: penalty_second_id,
      violator_id: violator_id,
      enforcer_id: id,
      whitness_id: whitness_id,
      description: description, 
      violation_time: violationTimeText,
      violation_date: violation_date,
      item_image: item_image
    }
    console.log(data)
		var config = {
			method: 'post',
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
      setLoading(true)
      navigation.navigate('HomeScreen')
      alert("Success Created!")
    })
    .catch(function(error){
      console.log(error)
      setLoading(true)
    })
  }

  const functionButton = () => {
    return (
      <Button style={{backgroundColor: '#d35400', borderRadius: 10}} onPress={() => submit()}>
        <Text>Save Violation</Text>
      </Button>
    )
  }

  const violatorChild = () => {
    var data = []
    data.push(
      <Picker.Item label={"Pilih"} value={"0"} key={"AbcdkOWAK"} />
    )
    if(users.length > 0){
      users.map((value, key) => {
        data.push(
          <Picker.Item label={value.name} value={value.id} key={key} />
        )
      })
    }
    return data
  }

  const getNik = (user_id, type) => {
    setLoading(false)
    if(type == "Violator"){
      setViolator(user_id)
    }else if(type == 'Enforcer'){
      setEnforcer(user_id)
    }else{
      setWhitness(user_id)
    }
    const headers = {
      'Authorization': `${tokenDua}`, 
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Cookie': '__profilin=p%3Dt'
    }
    const params = {
      user_id: user_id
    }
		Axios.get('http://192.168.131.119:8080/v1/auths/sysaccount/show', {params: params, headers: headers})
		.then(response => {
      if(type == "Violator"){
        setViolatorNik(response.data.data.user.substr(1))
      }else if(type == "Enforcer"){
        setEnforcerNik(response.data.data.user.substr(1))
      }else{
        setWhitnessNik(response.data.data.user.substr(1))
      }
			setLoading(true)
		})
		.catch(error => {
      console.log(error)
      Alert.alert(
        "Error",
        "Hubungi IT Department",
        [
          { text: "OK", onPress: () => console.log('Stop API') }
        ],
        { cancelable: false }
      );
			setLoading(true)
		})
  }

  const onChange = (event, val) => {
    const currentDate = val || violation_date
    setShow(Platform.OS === 'ios')
    setViolationDate(currentDate)
  };

  const showDateModal = () => {
    if(show == true){
      return (
        <DateTimePicker
          testID="dateTimePicker"
          value={violation_date}
          maximumDate={maxDate}
          is24Hour={true}
          display="calendar"
          onChange={(evt, val) => onChange(evt, val)}
        />
      )
    }
  }

  const timeUpdate = (value) => {
    const currentTime = moment(value.nativeEvent.timestamp) || violation_time
    setShowTime(Platform.OS === 'ios')
    setViolationTime(currentTime)
  }

  const showTimeModal = () => {
    if(showTime == true){
      return (
        <DateTimePicker mode="time" value={new Date()} onChange={(val) => timeUpdate(val)} />
      )
    }
  }

  const showDate = () => {
    setShow(true)
  }

  const showTimeFunction = () => {
    setShowTime(true)
  }

  const setPenaltiesFunc = (value, type) => {
    if(type == 'First'){
      setPenaltyFirst(value)
    }else{
      setPenaltySecond(value)
    }
  }

  const childPenalties = () => {
    var data = []
    if(penalties.length > 0){
    data.push(
      <Picker.Item label={"Pilih"} value={"0"} key={"AbcdkOWAK"} />
    )
      penalties.map((el, index) => {
        data.push(
          <Picker.Item label={el.name} value={el.id} key={index} />
        )
      })
    }
    return data
  }

  const addItemImage = (value) => {
    setIndexImage(indexImage + 1)
    conditionImage()
  }

  const conditionImage = () => {
    if(indexImage < 2){
      setItemImage([
        ...item_image, {
          id: item_image.length + 1,
          filename: null,
          filename_original: null,
          path: null,
          base64_full: null,
          created_by: enforcer_id
        }
      ])
    }
  }

  const imageContent = () => {
    const data = []
    if(item_image.length > 0){
      item_image.map((val, i) => {
        if(val.base64_full != null){
          data.push(
            <View key={i} style={{alignItems: 'center', justifyContent: 'center', height: 300, flex: 1, borderWidth: 0.5, marginTop: 25}}>
              <Image source={{uri: val.base64_full}} style={{width: 270, height: 270, resizeMode: 'contain'}} onPress={() => chooseImage()}/>
            </View>
          )
        }else{
          data.push(
          <View key={i} style={{alignItems: 'center', justifyContent: 'center', height: 300, flex: 1, borderWidth: 0.5, marginTop: 25}}>
            <Text style={{height: '100%', width: "100%", textAlign: 'center', textAlignVertical: 'center'}} onPress={() => chooseImage(i)}><Image style={{height: 50, width: 50}} source={cameraIcons} /></Text>
          </View>
          )
        }
      })
    }
    return data
  }

	const chooseImage = (i) => {
		const options = {
			includeBase64: true,
			maxHeight: 1000,
			maxWidth: 1000
		};
		launchCamera(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				const source = {counter_image: 1, uri: 'data:image/jpeg;base64;,' + response.assets[0].base64, status: 'active' }
				// const source = {counter_image: 1, uri: response.assets[0].base64, status: 'active' }
        let newArray = [...item_image]
        newArray[i].base64_full = source.uri
        setItemImage(newArray)
			}
		})
  }

  const buttonImageTrigger = () => {
    if(indexImage < 2){
      return (
        <View style={{flexDirection: 'row', padding: 10, borderBottomWidth: 0.5}}>
          <Button style={{backgroundColor: '#d35400', borderRadius: 10}} onPress={() => addItemImage(1)}>
            <Text>Tambah Foto</Text>
          </Button>
        </View>
      )
    }
  }

  const content = () => {
    return (
      <ScrollView>
 
        <View style={{borderBottomWidth: 0.5}}>
          <View style={{height: 40, justifyContent: 'center', paddingLeft: 10}}>
            <Text>Pelapor :</Text>
          </View>
          <View style={{paddingHorizontal: 10, paddingTop: 10, flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
            <View style={{marginLeft: 15, paddingLeft: 5, borderWidth: 0.5, borderRadius: 5, width: '70%', height: 40, justifyContent: 'center'}}>
              <Text>{name != null ? name : '-'}</Text>
            </View>
          </View>
          <View style={{padding: 10, flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
            <View style={{marginLeft: 15, paddingLeft: 5, backgroundColor: '#b8b8b8', borderWidth: 0.5, borderRadius: 5, width: '70%', height: 40, justifyContent: 'center'}}>
              <Text>{nik != null ? nik : "-"}</Text>
            </View>
          </View>
          
          <View style={{flexDirection: 'row', marginBottom: 5, justifyContent: 'flex-end', width: '100%'}}>
            <View style={{flexDirection: 'row', width: '70%', justifyContent: 'flex-end'}}>
              <View style={{borderWidth: 0.5, borderRadius: 5, height: 40, justifyContent: 'center', width: '68%', alignItems:'flex-end', paddingRight: 10}}>
                <Text onPress={() => showDate()}>{violationDateText != null ? violationDateText : "Pilih"}</Text>
              </View>
              {showDateModal()}
              <View style={{marginLeft: 5, borderWidth: 0.5, borderRadius: 5, marginRight: 10, height: 40, width: '25%', justifyContent: 'center', alignItems:'flex-end', paddingRight: 10}}>
                <Text onPress={() => showTimeFunction()}>{violationTimeText != null ? violationTimeText : '-'}</Text>
                {/* <TextInput style={{color: 'black'}} keyboardType={"numeric"} value={violation_time} onChangeText={(time) => setViolationTime(time)} /> */}
              </View>
              {showTimeModal()}
            </View>
          </View>
        </View>
        
        <View style={{borderBottomWidth: 0.5}}>
          <View style={{height: 40, justifyContent: 'center', paddingLeft: 10}}>
            <Text>Saksi :</Text>
          </View>
          <View style={{paddingHorizontal: 10, paddingTop: 10, flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
            <View style={{marginLeft: 15, paddingLeft: 5, borderWidth: 0.5, borderRadius: 5, width: '70%', height: 40, justifyContent: 'center'}}>
              <Picker 
                selectedValue={whitness_id}
                style={{ height: 40, width: 400, color: 'black' }}
                itemStyle={{height: 20}}
                onValueChange={(itemValue, itemIndex) => getNik(itemValue, "Whitness")}
              >
                {violatorChild()}
              </Picker>
            </View>
          </View>
          <View style={{padding: 10, flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
            <View style={{marginLeft: 15, paddingLeft: 5, backgroundColor: '#b8b8b8', borderWidth: 0.5, borderRadius: 5, width: '70%', height: 40, justifyContent: 'center'}}>
              <Text>{whitness_nik != null ? whitness_nik : "-"}</Text>
            </View>
          </View>
        </View>
 
        <View style={{borderBottomWidth: 0.5}}>
          <View style={{height: 40, justifyContent: 'center', paddingLeft: 10}}>
            <Text>Pelanggar :</Text>
          </View>
      
          <View style={{paddingHorizontal: 10, paddingTop: 10, flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
            <View style={{marginLeft: 15, paddingLeft: 5, borderWidth: 0.5, borderRadius: 5, width: '70%', height: 40, justifyContent: 'center'}}>
              <Picker 
                selectedValue={violator_id}
                style={{ height: 40, width: 400, color: 'black' }}
                itemStyle={{height: 20}}
                onValueChange={(itemValue, itemIndex) => getNik(itemValue, "Violator")}
              >
                {violatorChild()}
              </Picker>
              {/* <TextInput value={remark} onChangeText={(value) => setRemark(value)} style={{paddingLeft: 5, height: 40, width: 177}} placeholder="Type Here..." /> */}
            </View>
          </View>
        
          <View style={{padding: 10, flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
            <View style={{marginLeft: 15, paddingLeft: 5, backgroundColor: '#b8b8b8', borderWidth: 0.5, borderRadius: 5, width: '70%', height: 40, justifyContent: 'center'}}>
              <Text>{violator_nik != null ? violator_nik : '-'}</Text>
            </View>
          </View>
          
          <View style={{height: 40, justifyContent: 'center', paddingLeft: 10}}>
            <Text>Deskripsi :</Text>
          </View>
      
          <View style={{padding: 10, flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
            <View style={{marginLeft: 15, paddingLeft: 5, borderWidth: 0.5, borderRadius: 5, width: '70%', height: 80, justifyContent: 'center'}}>
              <TextInput value={description} multiline onChangeText={(value) => setDescription(value)} style={{color: 'black'}} placeholder="Deskripsi" placeholderTextColor="grey" />
            </View>
          </View>

        </View>

        <View style={{borderBottomWidth: 0.5}}>
          <View style={{height: 40, justifyContent: 'center', paddingLeft: 10}}>
            <Text>Hukuman 1 :</Text>
          </View>
      
          <View style={{paddingHorizontal: 10, paddingTop: 10, flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
            <View style={{marginLeft: 15, paddingLeft: 5, borderWidth: 0.5, borderRadius: 5, width: '70%', height: 40, justifyContent: 'center'}}>
              <Picker 
                selectedValue={penalty_first_id}
                style={{ height: 40, width: 400, color: 'black' }}
                itemStyle={{height: 20}}
                onValueChange={(itemValue, itemIndex) => setPenaltiesFunc(itemValue, "First")}
              >
                {childPenalties()}
              </Picker>
            </View>
          </View>
          <View style={{padding: 10, flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
            <View style={{marginLeft: 15, paddingLeft: 5, borderWidth: 0.5, borderRadius: 5, width: '70%', height: 80, justifyContent: 'center'}}>
              <TextInput value={penalty_description} multiline onChangeText={(value) => setPenaltyFirstDescription(value)} style={{color: 'black'}} placeholder="Pelanggaran Deskripsi 1" placeholderTextColor="grey" />
            </View>
          </View>
        </View>

        <View style={{borderBottomWidth: 0.5}}>
          <View style={{height: 40, justifyContent: 'center', paddingLeft: 10}}>
            <Text>Hukuman 2 :</Text>
          </View>
      
          <View style={{paddingHorizontal: 10, paddingTop: 10, flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
            <View style={{marginLeft: 15, paddingLeft: 5, borderWidth: 0.5, borderRadius: 5, width: '70%', height: 40, justifyContent: 'center'}}>
              <Picker 
                selectedValue={penalty_second_id}
                style={{ height: 40, width: 400, color: 'black' }}
                itemStyle={{height: 20}}
                onValueChange={(itemValue, itemIndex) => setPenaltiesFunc(itemValue, "Second")}
              >
                {childPenalties()}
              </Picker>
            </View>
          </View>
          <View style={{padding: 10, flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
            <View style={{marginLeft: 15, paddingLeft: 5, borderWidth: 0.5, borderRadius: 5, width: '70%', height: 80, justifyContent: 'center'}}>
              <TextInput value={penalty_description_second} multiline onChangeText={(value) => setPenaltySecondDescription(value)} style={{color: 'black'}} placeholder="Pelanggaran Deskripsi 2" placeholderTextColor="grey" />
            </View>
          </View>
        </View>
          

        {buttonImageTrigger()}

        {/* <View style={{marginTop: 20, flexDirection: 'row', height: 300, borderWidth: 0.3, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{justifyContent: 'center', alignItems: 'center', width: '50%', height: 300}}> */}
            {imageContent()}

          {/* </View>
        </View> */}

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
            <Text style={{color: 'white'}}>Add Violation Form</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', flex: 1, backgroundColor: '#DDDDDD', justifyContent: 'center', alignItems: 'center'}}>
        {loading == false ? <View style={{backgroundColor: '#DDDDDD', alignItems: 'center', justifyContent: 'center', paddingTop: 100}}><ActivityIndicator size="large" color="#0000ff"/></View> : content() }
      </View>
    </Container>
  ) 
}

export default AddViolation