import {View, ScrollView, ActivityIndicator, Image, Alert, RefreshControl} from 'react-native'
import React, {useState, useEffect, useCallback } from 'react'
import { Container, Text, Button, Content} from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from "@react-native-community/async-storage"
import moment from 'moment'
import HeaderContent from '../Header/index'

const Profile = ({route, navigation}) => {
  const {staff_name, staff_nik, staff_pms_access} = route.params
	var timeNow 	                    = moment()
  const [refreshing, setRefreshing] = useState(false);
  const [plant, setPlant]           = useState(0)
	const [loading, setLoading]       = useState(true);

	const buttLogout = async () => {
    try {
			AsyncStorage.getAllKeys()
			.then(keys => AsyncStorage.multiRemove(keys))
			.then(() => {
				navigation.replace('Login')
				alert("Successfully Logout!")
			})
    } catch (error) {
      console.log('Gagal Logout: ', error);
    }
	}

	const content = () => {
    return (
				<View style={{flexDirection: 'column', flex: 1, margin: 15}}>
					<View style={{paddingTop: 10, flexDirection: 'row', paddingLeft: 12}}>
						<View style={{width: "25%"}}>
							<Text style={{fontSize: 15}}>User</Text>
						</View>
						<View style={{width: "6%"}}>
							<Text style={{fontSize: 15}}>:</Text>
						</View>
						<View style={{width: "60%"}}>
							<TouchableOpacity>
								<Text style={{fontSize: 15}}>{staff_name}</Text>
							</TouchableOpacity>
						</View>
					</View>
					
					<View style={{paddingTop: 10, flexDirection: 'row', paddingLeft: 12}}>
						<View style={{width: "25%"}}>
							<Text style={{fontSize: 15}}>NIK</Text>
						</View>
						<View style={{width: "6%"}}>
							<Text style={{fontSize: 15}}>:</Text>
						</View>
						<View>
							<TouchableOpacity>
								<Text style={{fontSize: 15}}>{staff_nik}</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={{paddingTop: 10, paddingBottom: 10, flexDirection: 'row', paddingLeft: 12}}>
						<View style={{width: "25%"}}>
							<Text style={{fontSize: 15}}>PMS Access</Text>
						</View>
						<View style={{width: "6%"}}>
							<Text style={{fontSize: 15}}>:</Text>
						</View>
						<View style={{width: "56%"}}>
							<Text>{staff_pms_access != null ? staff_pms_access : '-'}</Text>
						</View>
					</View>

					<View style={{paddingTop: 10, flexDirection: 'row', paddingLeft: 12, width: "100%", borderTopWidth: 1, borderTopColor: 'gray', justifyContent: 'center'}}>
						<Button style={{backgroundColor: 'red'}} onPress={() => buttLogout()}>
							<Text style={{fontSize: 15}}>Logout</Text>
						</Button>
					</View>
				</View>
    )
  }

	const BottomNavigation = () => {
		return (
      <View style={{height: 75, backgroundColor: '#d35400', borderTopWidth: 1, justifyContent: 'space-around', borderColor: '#FEA82F', alignItems: 'center', flexDirection: 'row', flexWrap: 'nowrap'}}>
        <TouchableOpacity style={{flexDirection: 'column', borderWidth: 0.5, borderColor: '#FEA82F', height: "75%", justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10}} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={{color: 'white'}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'column', borderWidth: 0.5, borderColor: '#FEA82F', height: "75%", justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10}} onPress={() => navigation.navigate('AddViolation', {
          sys_plant_id: plant
        })} >
          <Text style={{color: 'white'}}>Add Violation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'column', borderWidth: 0.5, borderColor: '#FEA82F', height: "75%", justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10}}>
          <Text style={{color: 'white'}}>Profile</Text>
        </TouchableOpacity>
      </View>
		)
	}

  return (
    <Container>
      <View>
        <HeaderContent />
      </View>
      <View style={{flexDirection: 'row', flex: 1, backgroundColor: '#DDDDDD'}}>
				<View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
					<ScrollView>
						{loading == false ? <View style={{backgroundColor: '#DDDDDD', alignItems: 'center', justifyContent: 'center', paddingTop: 100}}><ActivityIndicator size="large" color="#0000ff"/></View> : content() }
					</ScrollView>
				</View>
      </View>
			{BottomNavigation()}
    </Container>
  ) 
}

export default Profile