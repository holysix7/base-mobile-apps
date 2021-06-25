import AsyncStorage from '@react-native-community/async-storage';

const Session = async(data) => {
    // console.log('sesi: ', data.app_pms_access)
    const oke = JSON.stringify(data.app_pms_access)
    try {
        await AsyncStorage.multiSet([
            ['id', JSON.stringify(data.id)],
            ['user', data.user],
            ['name', data.name],
            ['app_pms_access', oke]
        ])
    } catch (error) {
        console.log(error)
    }
}

export default Session;