import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/indexAction'
import DisplayItems from '../component/autoCompleteDropDown'

class App extends Component {

    componentDidMount(){
        this.props.foodItems();
    }
    
    render(){
        return(
            <div> 
                <DisplayItems datalist={this.props.output}></DisplayItems>
            </div>
        )
    }
}

function mapStateToProps(state){
    
    return{
        output: state.food
    }

  }

export default connect(mapStateToProps,actions)(App);