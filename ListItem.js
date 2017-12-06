import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

import Issue from './Issue'
import Fade from './Fade'

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

        const { name, lineStatuses } = this.props
        const { issueIsVisible } = this.state

        const issues = this._getIssues(lineStatuses)

        return (
            <View>
                <Text style={styles.item}>{name}</Text>

                {issues.length > 0 &&
                    <TouchableHighlight onPress={this._toggleIssues} underlayColor="white">
                        <View><Text>TOGGLE</Text></View>
                    </TouchableHighlight>
                }

                {issues.length > 0 &&
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{issues.length}</Text>
                    </View>
                }


                {issues.length > 0 &&
                    <Fade visible={issueIsVisible}>
                        {issues.map((issue, index) => <Issue key={index} {...issue} />)}
                    </Fade>
                }
            </View>

        );
    }
}

export default ListItem


const styles = StyleSheet.create({

    item: {
        padding: 12,
        paddingLeft: 20,
        fontSize: 18,

    },
    badge: {
        position: 'absolute',
        top: 12,
        right: 15,
        borderRadius: 20,
        padding: 5,
        backgroundColor: 'red',
        minWidth: 25,
        alignItems: 'center',
        justifyContent: 'center'

    },

    badgeText: {
        color: '#fff',
        fontSize: 10,
    }


})
