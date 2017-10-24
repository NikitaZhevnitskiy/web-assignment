import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Card } from '../common';
import ListItem from './ListItem';
import { SearchBar } from 'react-native-elements';
import { ScrollView, StyleSheet } from 'react-native';
import { getItems, deleteItem, keyWordChange } from "../../actions/todolist/ListActions";

class ListComponent extends Component{

    componentDidMount(){
        // initial
        this.props.getItems(this.props.token, this.props.keyword);
    }


    onCompleteButtonPress(itemId){
        const {token} = this.props;
        // delete
        this.props.deleteItem(token,itemId);
        // update list
        this.props.getItems(this.props.token, this.props.keyword);
    }

    onKeyWordChange(text){
        // console.log("LIST_COMPONENT items___________");
        // this.props.items.map(i=>console.log(i));
        // console.log("LIST_COMPONENT___________");

        this.props.keyWordChange(text, this.props.items);
    }

    render(){
        // console.log(this.props.keyword);

        return(
            <Card>
                <SearchBar
                    lightTheme
                    onChangeText={this.onKeyWordChange.bind(this)}
                    value={this.props.keyword || ''}
                    placeholder='Type Here...' />

                <ScrollView contentContainerStyle={styles.contentContainer}>

                    {
                        this.props.filtered.map(item => {
                            return <ListItem
                                item={item}
                                key={item._id}
                                whenPress={()=>this.onCompleteButtonPress(item._id)}
                            />
                        })
                    }

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

const mapStateToProps = state => {
    return {
        token:    state.auth.token,
        items:    state.todo_list.list,
        filtered: state.todo_list.filtered,
        keyword:  state.todo_list.keyword,
        error:    state.todo_list.error
    };
};


export default connect(mapStateToProps,
    {
        getItems,
        deleteItem,
        keyWordChange,

    }
)
(ListComponent);