import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, Image, StyleSheet, TouchableOpacity, AsyncStorage, SafeAreaView, ScrollView, ToastAndroid } from 'react-native';
import settings from '../AppSettings';
import axios from 'axios';
import Modal from 'react-native-modal';
import { Ionicons, Entypo, AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

const themeColor = settings.themeColor;
const fontFamily = settings.fontFamily;
const url = settings.url;
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import HttpsClient from '../api/HttpsClient';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import SimpleToast from 'react-native-simple-toast';
class makeAppointmentClinic extends Component {
    constructor(props) {

        let item = props.route.params.item
        super(props);
        this.state = {
            showModal: false,
            item,
            selectedDoctor: null,
            date: new Date(),
            show: false,
            show2: false,
            time: null,
            today: null,
            doctors:[]
        };
    }
 
    getDoctors = async () => {
        let api = `${url}/api/prescription/clinicDoctors/?clinic=${this.state.item.pk}`
        const data = await HttpsClient.get(api)
        console.log(api, "jjjjj")
        if (data.type == "success") {
            let doctors = []
            data.data.forEach((i)=>{
                let sendObject = {
                    label: i.doctor.first_name,
                    value: i.doctor.first_name,
                    pk: i.doctor.id
                }
                doctors.push(sendObject)
            })
            this.setState({ doctors,selectedDoctor:doctors[0]})
        }
    }

    componentDidMount() {
       this.getDoctors()
    }
    onChange = (selectedDate) => {
        if (selectedDate.type == "set") {
            this.setState({ today: moment(new Date(selectedDate.nativeEvent.timestamp)).format('YYYY-MM-DD'), show: false, date: new Date(selectedDate.nativeEvent.timestamp) }, () => {


            })

        } else {
            return null
        }

    }
    onChange2 = (selectedDate) => {
        if (selectedDate.type == "set") {
            this.setState({ time: moment(new Date(selectedDate.nativeEvent.timestamp)).format('hh:mm a'), show2: false, date: new Date(selectedDate.nativeEvent.timestamp) }, () => {


            })

        } else {
            return null
        }

    }
    requestAppointment = async () => {
        if(this.state.today ==null){
            return SimpleToast.show("please select date")
        }
        if (this.state.time == null) {
            return SimpleToast.show("please select time")
        }
        let api = `${url}/api/prescription/addAppointment/`
        let sendData = {
            clinic: this.state.item.pk,
            doctor: this.state.selectedDoctor.pk,
            requesteduser: this.props.user.id,
            requesteddate: this.state.today,
            requestedtime: this.state.time
        }
      
        let post = await HttpsClient.post(api, sendData)
        if (post.type == "success") {
            Toast.show("requested Successfully")
            setTimeout(() => {
                this.props.navigation.goBack()
            }, 2000)
        } else {
            Toast.show("Try again")
        }
    }
    render() {
        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                    <View style={{ flex: 1, }}>
                        <StatusBar backgroundColor={themeColor} />
                        {/* Headers */}
                        <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, justifyContent: "center", flexDirection: "row" }}>
                            <TouchableOpacity style={{ flex: 0.2, marginLeft: 20, alignItems: "center", justifyContent: 'center' }}
                                onPress={() => { this.props.navigation.goBack() }}
                            >
                                <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                            </TouchableOpacity>
                            <View style={{ flex: 0.6, alignItems: 'center', justifyContent: "center" }}>
                                <Text style={[styles.text, { color: "#fff",fontWeight:"bold",fontSize:20}]}> Appointment</Text>
                            </View>
                            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>

                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ margin: 20 }}>
                                <Text style={[styles.text, { fontWeight: "bold", fontSize: 18 }]}>Select Doctor</Text>
                                <View style={{ marginTop: 10 }}>
                                    <DropDownPicker

                                        items={this.state.doctors}
                                        defaultValue={this.state.doctors[0]?.value}
                                        containerStyle={{ height: 40 }}
                                        style={{ backgroundColor: '#fafafa' }}
                                        itemStyle={{
                                            justifyContent: 'flex-start'
                                        }}
                                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                                        onChangeItem={item => this.setState({
                                            selectedDoctor: item
                                        })}
                                    />
                                </View>

                            </View>
                            <View style={{ marginLeft: 20 }}>
                                <Text style={[styles.text, { fontWeight: "bold", fontSize: 18 }]}>Select Date</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity style={{ marginTop: 10 }}
                                        onPress={() => { this.setState({ show: true }) }}
                                    >
                                        <FontAwesome name="calendar" size={24} color="black" />
                                    </TouchableOpacity>
                                    <View style={{ alignItems: 'center', justifyContent: "center", marginLeft: 20, marginTop: 5 }}>
                                        <Text>{this.state.today}</Text>
                                    </View>

                                </View>


                            </View>
                            <View style={{ marginLeft: 20, marginTop: 10 }}>
                                <Text style={[styles.text, { fontWeight: "bold", fontSize: 18 }]}>Select Time</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity style={{ marginTop: 10 }}
                                        onPress={() => { this.setState({ show2: true }) }}
                                    >
                                        <FontAwesome name="calendar" size={24} color="black" />
                                    </TouchableOpacity>
                                    <View style={{ alignItems: 'center', justifyContent: "center", marginLeft: 20, marginTop: 5 }}>
                                        <Text>{this.state.time}</Text>
                                    </View>

                                </View>


                            </View>
                            {this.state.show && (
                                <DateTimePicker
                                    testID="dateTimePicker1"
                                    value={this.state.date}
                                    mode={"date"}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(time) => { this.onChange(time) }}
                                />
                            )}
                            {this.state.show2 && (
                                <DateTimePicker
                                    testID="dateTimePicker2"
                                    value={this.state.date}
                                    mode={"time"}

                                    display="default"
                                    onChange={(time) => { this.onChange2(time) }}
                                />
                            )}
                        </View>
                         <View 
                            style={{  position: 'absolute', width,  bottom: 30,alignItems:"center",justifyContent:"center"}}
                         >
                            <TouchableOpacity 
                                style={{ height: height * 0.05, width: width * 0.4, borderRadius: 20, alignItems: "center", justifyContent: "center", flexDirection: "row", backgroundColor: themeColor,}}
                                onPress={() => { this.requestAppointment() }}
                            >
                                <Text style={[styles.text, { color: "#fff" }]}>Confirm </Text>


                            </TouchableOpacity>
                         </View>
                       
                    </View>

                </SafeAreaView>

            </>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    },
    topSafeArea: {
        flex: 0,
        backgroundColor: themeColor
    },
    bottomSafeArea: {
        flex: 1,
        backgroundColor: "#fff"
    },
})

const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
        user: state.selectedUser,
    }
}
export default connect(mapStateToProps, { selectTheme })(makeAppointmentClinic)