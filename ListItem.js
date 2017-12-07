import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

import Issue from './Issue'
import Fade from './Fade'



const branding = {
    bakerloo: '#894e24',
    central: '#dc241f',
    circle: '#ffce00',
    district: '#007229',
    hammersmithcity:'#d799af',
    dlr:'#00b1a8',
    jubilee:'#667070',
    metropolitan:'#82034f',
    northern:'#000000',
    tflrail:'red',
    waterloocity:'red',
    londonoverground:'red',
    victoria:'red',
    piccadilly:'red'
}

class ListItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            issueIsVisible: false
        }

    }

    _getIssues = (issues) => {
        return issues.filter(issue => issue.statusSeverityDescription !== 'Good Service')
    }

    _toggleIssues = () => {

        const issueIsVisible = !this.state.issueIsVisible

        this.setState({
            issueIsVisible
        })

    }

    render() {

        const { id, name, lineStatuses } = this.props
        const { issueIsVisible } = this.state

        const issues = this._getIssues(lineStatuses)

        // const bg = {
        //     backgroundColor: issues.length > 0 ? '#ffecf4' : '#fff'
        // }

        const line = {
            height: 12,
            width: 12,
            backgroundColor: branding[id.replace('-', '')],
            marginLeft: 20,
            marginRight: 12,
            // borderRadius: 5

        }

        return (
            <TouchableHighlight onPress={this._toggleIssues} underlayColor="white">
                <View>
                    <View style={styles.item}>

                        <View style={line}></View>

                        <Text>{name}</Text>

                        {issues.length > 0 &&
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{issues.length}</Text>
                            </View>
                        }




                    </View>

                    {issues.length > 0 && issueIsVisible &&
                        
                            <View style={styles.issues}>
                                {issues.map((issue, index) => <Issue key={index} {...issue} />)}
                            </View>
                        
                    }
                </View>
            </TouchableHighlight>

        );
    }
}

export default ListItem


const styles = StyleSheet.create({

    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingTop: 15,
        paddingBottom: 15,

    },

    badge: {
        position: 'absolute',
        top: 12,
        right: 15,
        borderRadius: 10,
        padding: 2,
        backgroundColor: 'red',
        minWidth: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },

    badgeText: {
        color: '#fff',
        fontSize: 10
    },

    issues: {
        flex: 1,
        flexDirection: 'column',
    },

    

})
