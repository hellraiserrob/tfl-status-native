import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class Issue extends Component {

    render() {

        const { statusSeverityDescription, reason } = this.props


        return (
            <View>
                <Text style={styles.title}>{statusSeverityDescription}</Text>
                <Text style={styles.reason}>{reason}</Text>
                
            </View>

        );
    }
}

export default Issue


const styles = StyleSheet.create({

    title: {
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    reason: {
        paddingLeft: 20,
        paddingRight: 20,   
        marginBottom: 10
    }
  

})
