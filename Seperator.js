import React, { Component } from 'react';
import { View } from 'react-native';


class Seperator extends Component {
    
    render = () => {
        return (
            <View
                style={{
                    height: 0,
                    // width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: 0
                }}
            />
        );
    };

}

export default Seperator