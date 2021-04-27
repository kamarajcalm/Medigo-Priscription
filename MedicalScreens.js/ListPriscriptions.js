import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, SafeAreaView } from 'react-native';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../AppSettings';
import medicine from '../components/Medicine';
import Medicine from '../components/Medicine';
import HttpsClient from '../api/HttpsClient';
import moment from 'moment';
const { height, width } = Dimensions.get("window");
const fontFamily = settings.fontFamily;
const themeColor = settings.themeColor;
const url = settings.url;
class ListPriscriptions extends Component {
    constructor(props) {

        super(props);
        this.state = {
            pateints: [],
            priscriptions:[],
             item: this.props.route.params.item,
        };
    }
    getPateintPrescription = async () => {
        console.log(this.state.item,'kkk')
        let api = `${url}/api/prescription/prescriptions/?forUser=${this.state.item.user}`
        console.log(api)
        let data = await HttpsClient.get(api)
        console.log(data)
        if (data.type == "success") {
            this.setState({ priscriptions: data.data })
        }
    }
  componentDidMount(){
      this.getPateintPrescription()
  }
    render() {
        const {item} =this.state
        return (
            <>
                <SafeAreaView style={styles.topSafeArea} />
                <SafeAreaView style={styles.bottomSafeArea}>
                    <View style={{ height: height * 0.1, backgroundColor: themeColor, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', alignItems: "center" }}>
                        <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Ionicons name="chevron-back-circle" size={30} color="#fff" />
                        </TouchableOpacity>
                        <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>

                            <Image
                                source={{ uri: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                                style={{ height: 60, width: 60, borderRadius: 30, }}

                            />


                            <Text style={[styles.text, { color: '#fff', marginLeft: 20, fontWeight: 'bold', fontSize: 20 }]}>{item?.name}</Text>
                        </View>
                        <View style={{ flex: 0.2 }}>
                        </View>
                    </View>
                  
                    <FlatList
                        data={this.state.priscriptions}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={[styles.card, { flexDirection: "row", borderRadius: 5 ,marginTop:20}]}
                                    onPress={() => { this.props.navigation.navigate('showCard2', { item }) }}
                                >
                                    <View style={{ flex: 0.3, alignItems: 'center', justifyContent: "center" }}>
                                        <Image
                                            source={{ uri: item?.doctordetails?.dp || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" }}
                                            style={{ height: 60, width: 60, borderRadius: 30 }}
                                        />
                                    </View>
                                    <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                                        <View >
                                            <Text style={[styles.text, { fontSize: 18, }]}>{item?.doctordetails?.name}</Text>
                                            <Text style={[styles.text, { fontSize: 12, }]}>{item?.clinicname}</Text>
                                        </View>

                                    </View>
                                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: "center" }}>
                                        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>{moment(item.created).format("DD/MM/YYYY")}</Text>

                                        </View>
                                        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>{moment(item.created).format("h:mm a")}</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />

                </SafeAreaView>
            </>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    },


})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
export default connect(mapStateToProps, { selectTheme })(ListPriscriptions);