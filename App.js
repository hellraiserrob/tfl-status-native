import React, { Component } from 'react';
import { AppRegistry, Alert, ToolbarAndroid, FlatList, SectionList, StyleSheet, Text, View, ToastAndroid } from 'react-native';

import ListItem from './ListItem'

class App extends Component {


    constructor(props) {
        super(props)

        this.state = {
            data: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.getStatus()
    }

    getStatus = () => {

        this.setState({
            isLoading: true
        })


        return fetch("https://api.tfl.gov.uk/line/mode/tube,dlr,overground,tflrail,/status/")
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    data: responseJson,
                    isLoading: false
                })
                ToastAndroid.showWithGravity('Update complete...', ToastAndroid.SHORT, ToastAndroid.CENTER);
            })
            .catch(error => {
                Alert(error);
            });
    }


    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "#ddd",
                    marginLeft: 20
                }}
            />
        );
    };

    render() {

        const { data, isLoading } = this.state

        return (
            <View style={styles.container}>
                {/*<ToolbarAndroid
                    title="Status"
                    titleColor="#fff"
                    style={styles.toolbar}

                />*/}

                <FlatList
                    data={data}
                    renderItem={({ item, i }) => <ListItem {...item} />}
                    keyExtractor={(item, index) => index}
                    onRefresh={this.getStatus}
                    refreshing={isLoading}
                    ItemSeparatorComponent={this.renderSeparator}
                />
                {/*<SectionList
                    sections={[
                        { title: 'D', data: ['Devin'] },
                        { title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
                    ]}
                    renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />*/}
            </View>
        );
    }
}

export default App


const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#0019a8',
        height: 56,
    },
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 20,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#0019a8'
    },
    item: {
        padding: 12,
        paddingLeft: 20,
        fontSize: 18,
        height: 44,
    },
    circle: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 5,
        width: 10,
        height: 10,
        backgroundColor: 'red'

    }
})
