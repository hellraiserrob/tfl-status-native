import React, { Component } from 'react';
import { AppRegistry, Alert, ToolbarAndroid, FlatList, SectionList, StyleSheet, Text, View, ToastAndroid } from 'react-native';

import { Font } from 'expo';


import ListItem from './ListItem'
import { style } from 'expo/src/Font';

class App extends Component {


    constructor(props) {
        super(props)

        this.state = {
            data: [],
            isLoading: false,
            fontLoaded: false
        }
    }

    async componentDidMount() {
        this.getStatus()

        await Font.loadAsync({
            'proxima-nova': require('./assets/fonts/proximaNova.ttf'),
        });

        this.setState({ fontLoaded: true });

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

        const { data, isLoading, fontLoaded } = this.state

        return (
            <View style={styles.container}>
                {/*<ToolbarAndroid
                    title="Status"
                    titleColor="#fff"
                    style={styles.toolbar}

                />*/}

                {fontLoaded && <FlatList
                    data={data}
                    renderItem={({ item, i }) => <ListItem {...item} />}
                    keyExtractor={(item, index) => index}
                    onRefresh={this.getStatus}
                    refreshing={isLoading}
                    ItemSeparatorComponent={this.renderSeparator}
                />
                }
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
    
    heading: {
        fontFamily: 'proxima-nova'
    },
    
    toolbar: {
        backgroundColor: '#0019a8',
        height: 56,
    },
    container: {
        flex: 1,
        paddingTop: 22
    },
    
})
