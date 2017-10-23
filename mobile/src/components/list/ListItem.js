import React from 'react';
import { Text, View } from 'react-native';
import { CardSection, Button } from "../common";

const ListItem = (props)=> {

    const {item,whenPress} = props;

    return(
        <View key={item._id} style={styles.itemBoxStyle}>

            {/*Title*/}
            <CardSection>
                <Text style={styles.titleStyle}>
                    {item.title}
                </Text>
            </CardSection>

            {/*Description*/}
            <CardSection>
                <Text
                    style={{flex:1}}
                    adjustsFontSizeToFit={true}
                >
                    {item.description}
                </Text>
            </CardSection>

            {/*Button*/}
            <CardSection>
                <Button
                    whenPress={whenPress}
                >
                    Complete
                </Button>
            </CardSection>

        </View>
    )

};

const styles = {
    titleStyle:{
        fontSize: 18,
        paddingLeft:15,
    },
    itemBoxStyle:{
        paddingTop:5
    }
};
export default ListItem;