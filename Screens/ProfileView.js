import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, Image, StyleSheet, TouchableOpacity, AsyncStorage, SafeAreaView, ScrollView } from 'react-native';
import settings from '../AppSettings';
import axios from 'axios';
import Modal from 'react-native-modal';
import { Ionicons, Entypo, AntDesign, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

const themeColor = settings.themeColor;
const fontFamily = settings.fontFamily;
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
class ProfileView extends Component {
    constructor(props) {
        let item = props.route.params.item
        super(props);
        this.state = {
            showModal: false,
            item
        };
    }
    request = async () => {
        let data = await axios.get('http:192.168.29.98:8000/api/profile/users')
        console.log(data.data, "hhhh")
    }
   
    componentDidMount() {
        // this.request()
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
                                <Text style={[styles.text, { color: "#fff" }]}>Profile</Text>
                            </View>
                            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: "center" }}>
                               
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <ScrollView>
                                <View style={{ marginTop: 20, flexDirection: "row" }}>
                                    <View style={{ flex: 0.4, height: height * 0.2, alignItems: 'center', justifyContent: "center" }}>
                                        <Image
                                            source={{ uri: "https://images.unsplash.com/photo-1558507652-2d9626c4e67a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" }}
                                            style={{ height: "100%", width: "70%", borderRadius: 10 }}
                                        />
                                    </View>
                                    <View style={{ flex: 0.6, height: height * 0.2, }}>
                                        <View style={{flex:0.33,justifyContent:"space-between"}}>
                                            <Text style={[styles.text, { fontSize: 20, color:"#0F2851",fontWeight:"bold"}]}>{this.state.item.name}</Text>
                                            <Text style={[styles.text, { fontSize: 15, color:"gray"}]}>{this.state.item.specialization}</Text>
                                        </View>
                                        <View style={{ flex: 0.33 ,flexDirection:"row",alignItems:'center'}}>
                                            <View style={{ height: 35, width: 35, borderRadius: 5, backgroundColor:"#FAFAFF",elevation:5,alignItems:"center",justifyContent:"center"}}>
                                                <FontAwesome name="star" size={24} color="#FFC000" />
                                            </View>
                                           <View style={{justifyContent:'center',marginLeft:20}}>
                                                <Text style={[styles.text, { fontSize: 15, color: "gray" }]}>Rating</Text>
                                                <Text style={[styles.text, { fontSize: 15, color: "#0F2851",fontWeight:"bold" }]}>4.5 out of 5</Text>
                                           </View>
                                        </View>
                                        <View style={{ flex: 0.33, flexDirection: "row", alignItems: 'center' }}>
                                            <View style={{ height: 35, width: 35, borderRadius: 5, backgroundColor: "#FAFAFF", elevation: 5, alignItems: "center", justifyContent: "center" }}>
                                                <MaterialCommunityIcons name="account-group" size={24} color="#0F2851" />
                                            </View>
                                            <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                                                <Text style={[styles.text, { fontSize: 15, color: "gray" }]}>Pateint</Text>
                                                <Text style={[styles.text, { fontSize: 15, color: "#0F2851", fontWeight: "bold" }]}>1000+</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                           
                         
                        </View>
                       
                        <TouchableOpacity style={{ height: height * 0.07, position: 'absolute', width: width * 0.7, backgroundColor: themeColor ,bottom:30,left:60,borderRadius:20,alignItems:"center",justifyContent:"center",flexDirection:"row"}}
                          onPress ={()=>{this.props.navigation.navigate('MakeAppoinment',{item:this.state.item})}}
                        >
                            <Text style={[styles.text,{color:"#fff"}]}>Make Appoinment</Text>
                            <View style={{marginLeft:20}}>
                                <AntDesign name="right" size={20} color="#fff"/>
                            </View>
                         
                        </TouchableOpacity>
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

    }
}
export default connect(mapStateToProps, { selectTheme })(ProfileView)