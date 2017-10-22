import React, {Component} from 'react';
import { Actions } from 'react-native-router-flux';
import {Card, CardSection, Button, Input} from '../common';
import ListItem from './ListItem';
import { SearchBar } from 'react-native-elements';
import { ScrollView, StyleSheet } from 'react-native';

import mockedItems from './items'

class List extends Component{

    render(){

        const items = mockedItems;
        return(
            <Card>
                <SearchBar
                    lightTheme
                    onChangeText={()=>console.log("text changed")}
                    placeholder='Type Here...' />

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {items.map(item => {
                       return <ListItem item={item} key={item._id}/>
                    })}
                </ScrollView>
            </Card>
        );
    };
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20
    }
});

export default List