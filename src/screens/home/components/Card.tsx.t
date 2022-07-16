import { useNavigation } from "@react-navigation/native";
import { SCREEN_WIDTH } from "Cards/src/services/helper/Constant";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import { style } from "styled-system";
import Orange from "Cards/assets/images/orange.png";
import { useToast } from "native-base";
import { Client } from "Cards/src/services/config/clients";
import { GET } from "Cards/src/services/config/api";
import { useSelector } from "react-redux";

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
const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH / 1.2,
        height: CARD_HEIGHT / 1.65,
        resizeMode: 'contain',


    },
});
interface CardProps {
    type: Cards;
}

export default ({ type }: CardProps, data: any) => {
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
    switch (type) {
        case Cards.Card1:
            source = require("../../../../assets/images/zain-logo.png");
            () => setselectedArr(items[0].data)
            break;
        case Cards.Card2:
            source = require("../../../../assets/images/orange-logo.png");
            break;
        case Cards.Card3:
            source = require("../../../../assets/images/umniah.png");
            break;

    }
    const navigation = useNavigation();
    const onNavigation = (type) => {
        console.log("allData", allData)

        console.log("[type]", type)

        console.log("allData[type]", allData[type])
        if (allData[type] != undefined) {
            navigation.navigate('CardListingScreen', { type: type, source: source, items: allData[type].children, title: items[type].title })

        } else {
            navigation.navigate('ComingSoonScreen')

        }

    }
    return <TouchableOpacity onPress={() => onNavigation(type)}><Image style={styles.card} {...{ source }} /></TouchableOpacity>;
};