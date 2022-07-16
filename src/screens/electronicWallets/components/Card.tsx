import { useNavigation } from "@react-navigation/native";
import { SCREEN_WIDTH } from "Cards/src/services/helper/Constant";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { height, justifyContent, style } from "styled-system";
import Orange from "Cards/assets/images/orange.png";
import { useToast } from "native-base";
import { Client } from "Cards/src/services/config/clients";
import { GET } from "Cards/src/services/config/api";
import { useSelector } from "react-redux";
import Title from "Cards/src/components/Title";
import { Colors } from "Cards/assets/styles/Colors";

const ratio = 228 / 362;
export const CARD_WIDTH = SCREEN_WIDTH * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
const items = [
    {
        title: 'Zain', data: [

            {
                name: 'GSM', subLList: [
                    { name: '0.5', image: Orange },
                    { name: '1', image: Orange },
                    { name: '3', image: Orange },
                    { name: '5', image: Orange },
                    { name: '12', image: Orange },


                ]
            },
            {
                name: 'MIX', subLList: [
                    { name: '2.5', image: Orange },
                    { name: '3', image: Orange },
                    { name: '3.5', image: Orange },
                    { name: '4', image: Orange },
                    { name: '5', image: Orange },
                    { name: '5.5', image: Orange },
                    { name: '7.5', image: Orange },
                ]
            },
            {
                name: 'DATA', subLList: [
                    { name: '2', image: Orange },
                    { name: '6', image: Orange },
                    { name: '8', image: Orange },
                    { name: '9', image: Orange },
                ]
            }

        ],
    },
    {
        title: 'Orange', data: [

            {
                name: 'GSM', subLList: [
                    { name: '1', image: Orange },
                    { name: '3', image: Orange },
                    { name: '5', image: Orange },
                    { name: '6', image: Orange },
                    { name: '12', image: Orange },
                ]
            },
            {
                name: 'Nos B Nos', subLList: [
                    { name: '5', image: Orange },
                    { name: '6', image: Orange },
                    { name: '7', image: Orange },
                    { name: '8', image: Orange },
                    { name: '9', image: Orange },
                    { name: '10', image: Orange },
                ]
            },
            {
                name: 'DATA', subLList: [
                    { name: '7', image: Orange },
                    { name: '8', image: Orange },
                ]
            },
            {
                name: 'WEENAK', subLList: [
                    { name: '2', image: Orange },
                    { name: '4', image: Orange },
                ]
            },

        ],
    },
    {
        title: 'umniah', data: [

            {
                name: 'GSM', subLList: [
                    { name: '1', image: Orange },
                    { name: '3', image: Orange },
                    { name: '5', image: Orange },
                ]
            },
            {
                name: 'SMART', subLList: [
                    { name: '1', image: Orange },
                    { name: '3', image: Orange },
                    { name: '4', image: Orange },
                    { name: '5', image: Orange },
                    { name: '6', image: Orange },
                    { name: '7', image: Orange },
                    { name: '8', image: Orange },
                    { name: '9', image: Orange },
                    { name: '10', image: Orange }]
            },
            {
                name: 'EVO', subLList: [
                    { name: '1', image: Orange },
                    { name: '3', image: Orange },
                    { name: '6', image: Orange },
                    { name: '7', image: Orange },
                    { name: '8', image: Orange },
                ]
            },


        ],
    }
]
export enum Cards {
    Card1,
    Card2,
    Card3,
    Card4,
    Card5,
    Card6,
}

interface CardProps {
    type: Cards;
    data: any;
    isGrid?: boolean
}

export default ({ type, data, isGrid }: CardProps) => {
    const styles = StyleSheet.create({
        card: {
            width: isGrid ? CARD_WIDTH / 1.8 : CARD_WIDTH / 1.2,
            height: isGrid ? CARD_HEIGHT / 1.95 : CARD_HEIGHT / 1.65,
            marginVertical: 15,
            marginHorizontal: isGrid ? 10 : 0,
            resizeMode: 'cover',
            justifyContent: 'center',
            alignItems: 'center',

        },
        button: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.35,
            shadowRadius: 3.84,

            elevation: 5,

        }
    });
    const toast = useToast()
    interface RootState {
        authToken: string;
    }
    const token = (state: RootState) => state.authToken;
    const useToken = useSelector(token);
    const [allData, setAllData] = useState([])
    const getData = () => {
        Client.get(
            GET.CARD_TYPE, {
            headers: {
                "Authorization": useToken,

            }
        },

        )
            .then((res) => {
                // if (res.status == 200) {
                console.log("data", res.data)
                setAllData(res.data.data)
                // }
            })
            .catch((error) => {
                toast.show({
                    title: "error",
                    status: "error",
                    description: error.message,
                    width: SCREEN_WIDTH,
                })
            });
    }
    useEffect(() => {
        getData()

    }, [])
    const [selectedArr, setselectedArr] = useState([])
    let source: number;
    switch (data.nameEnglish) {
        case 'ZAIN':
            source = require("../../../../assets/images/zain-logo.png");
            () => setselectedArr(items[0].data)
            break;
        case 'ORANGE':
            source = require("../../../../assets/images/orange-logo.png");
            break;
        case 'UMNIAH':
            source = require("../../../../assets/images/umniah.png");
            break;
    }
    const navigation = useNavigation();
    const onNavigation = (data) => {

        if (allData[type] != undefined) {
            navigation.navigate('CardListingScreen', { type: type, source: source, items: data.children, title: data.nameArabic })

        }
        // } else {
        //     navigation.navigate('ComingSoonScreen')

        // }

    }
    return <TouchableOpacity style={styles.button} onPress={() => onNavigation(data)}>
        <ImageBackground borderRadius={15} style={styles.card} source={source ? source : { uri: data.image }} >
            <View style={{ backgroundColor: data.nameEnglish === 'Egyptian Cards' ? Colors.BLACK : 'transparent', opacity: 0.7, marginTop: 0, width: '90%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                {data.nameEnglish === 'Egyptian Cards' &&
                    <Title fontFamily='Cairo-Bold' style={{ fontSize: 25, marginTop: -5, color: Colors.WHITE }} title={data.nameArabic} />
                }

            </View>

        </ImageBackground>
    </TouchableOpacity>
};