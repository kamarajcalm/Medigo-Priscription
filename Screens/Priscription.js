import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    SafeAreaView,
    Dimensions,
    StatusBar,
    TouchableWithoutFeedback,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import settings from '../AppSettings';
import { Fontisto } from '@expo/vector-icons';
import moment from 'moment';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
const fontFamily = settings.fontFamily;
const themeColor =settings.themeColor
const cardHeight = 250;
const cardTitle = 75;
const cardPadding = 20;

const { height } = Dimensions.get("window");
const cards = [
    {
        name: "Sri clinic",
        color: "",
        doctor:"kamaraj",
        No:"7010117137"
    },
    {
        name: "Ram clinic",
        color: "#eba65c",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "take care hospital",
        color: "#eba65c",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Make well",
        color: "#eba65c",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Combi",
        color: "#eba65c",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Signature",
        color: "#eba65c",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Coffee",
        color: "#eba65c",
        doctor: "kamaraj",
        No: "7010117137"
    },
    {
        name: "Shot",
        color: "#eba65c",
        doctor: "kamaraj",
        No: "7010117137"
    },
    

    
];

class Priscription extends React.Component {
    constructor(props) {
        const Date1 = new Date()
        const day = Date1.getDate()
        const month = Date1.getMonth() + 1
        const year = Date1.getFullYear()
        const today = `${year}-${month}-${day}`
     
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            y: new Animated.Value(0),
            showList: true,
            today,
            mode: 'date',
            date: new Date(),
            show: false,
        };
    }
    onChange = (selectedDate) => {
        if (selectedDate.type == "set") {
            this.setState({ today: moment(new Date(selectedDate.nativeEvent.timestamp)).format('YYYY-MM-DD'), show: false, date: new Date(selectedDate.nativeEvent.timestamp) }, () => {
                console.log(this.state.today,  "jjjj")
                
            })

        } else {
            return null
        }

    }
    render() {
        const { y } = this.state;
        return (
           

            
            <View style={{flex:1,backgroundColor:"#f3f3f3f3"}}>
           
                  {/* HEADERS */}
                <View style={{ height: height * 0.1, backgroundColor: themeColor,borderBottomRightRadius:20,borderBottomLeftRadius:20 ,justifyContent:"center"}}>
                      <View>
                          <Text style={{color:'#fff',fontFamily:"openSans",marginLeft:20}}>Welcome kamaraj,</Text>  
                      </View>
                </View>
                <View style={{height: height * 0.1,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                    <Text style={[styles.text,{ color: "#000" }]}>{this.state.today}</Text>
                    <TouchableOpacity 
                      style={{marginLeft:20}} 
                      onPress={()=>{this.setState({show:true})}}
                    >
                        <Fontisto name="date" size={24} color={themeColor} />
                    </TouchableOpacity>
                    {this.state.show && (
                        <DateTimePicker
                            testID="dateTimePicker1"
                            value={this.state.date}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={(time) => { this.onChange(time) }}
                        />
                    )}
                </View>
            <View style={styles.root}>
                    <StatusBar backgroundColor={themeColor}/>
            

              
                <View style={styles.container}>
                      
                    <>
                  
                 {this.state.showList&&<View style={StyleSheet.absoluteFill}>
                        {cards.map((card, i) => {
                            const inputRange = [-cardHeight, 0];
                            const outputRange = [
                                cardHeight * i,
                                (cardHeight - cardTitle) * -i
                            ];
                            if (i > 0) {
                                inputRange.push(cardPadding * i);
                                outputRange.push((cardHeight - cardPadding) * -i);
                            }
                            const translateY = y.interpolate({
                                inputRange,
                                outputRange,
                                extrapolateRight: "clamp"
                            });
                            return (
                                <Animated.View
                                    key={i}
                                    style={{ transform: [{ translateY }] }}
                                >
                                    <TouchableOpacity
                                        style={[styles.card, { backgroundColor: "#fff" }]}
                                        onPress={()=>{
                                          this.props.navigation.navigate("showCard",{item:card})
                                       }}
                                    >
                                      <View style={{margin:20,height:50,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
                                          <View>
                                              <Text>{card.name}</Text>
                                          </View>
                                          <View>
                                                <Text>{card.doctor}</Text>
                                          </View>
                                            <View>
                                                <Text>{card.No}</Text>
                                            </View>
                                      </View>
                                    </TouchableOpacity>
                                </Animated.View>
                            );
                        })}
                    </View>}
                 
                    <Animated.ScrollView
                        
                        scrollEventThrottle={16}
                        contentContainerStyle={styles.content}
                        showsVerticalScrollIndicator={false}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: { y }
                                    }
                                }
                            ],
                            { useNativeDriver: true }
                        )}
                    />
                    </>
                    
                </View>
        
                    </View>
                <View style={{
                    position: "absolute",
                    bottom: 100,
                    left: 20,
                    right: 20,
                    flex:1,
                    alignItems:"center",
                    justifyContent:"center",

                    borderRadius: 20}}>
                      <TouchableOpacity 
                        onPress={()=>{this.props.navigation.navigate('addPriscription')}}
                      >
                        <AntDesign name="pluscircle" size={40} color={themeColor} />
                     </TouchableOpacity> 
                  </View>   
            </View>
               
        
         
        );
    }
}

const styles = StyleSheet.create({
    text:{
       fontFamily
    },
    root: {
         flex:1,
         marginHorizontal:20
    },
    container: {
        flex: 1
    },
    content: {
        height: height * 2
    },
    card: {
        
        height: cardHeight,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0,
        shadowRadius: 4.65,

        elevation: 8,
       
    }
});
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
export default connect(mapStateToProps, { selectTheme })(Priscription)