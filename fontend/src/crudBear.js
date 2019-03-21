import React, { Component } from 'react'
import { connect } from "react-redux"
import './App.css'
import { addbear,getBears } from "./actions"
import { store } from "./App"


class crudBear extends Component {
    componentDidMount = () => {
        this.props.getBears()
    }

    state = { bearState: '' }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // addbear = () => {
    //     this.handleChange()
    //     axios.post(`http://localhost/api/bears`)
    //     this.componentDidMount()
    //     console.log('SS'+this.state.bearState.bearname);

    // }
    // delbear = () => {
    //     axios.delete(`http://localhost/api/bears/`)
    // }


    render() {
        return (
            <div class='app'>
                <h1>CRUD Bear</h1>
                <div className='container'>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">ID:</span>
                        </div>
                        <input name="id" value={this.props.id} placeholder='Delete' />
                    </div>

                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Bear:</span>
                        </div>
                        <input type='text' name="bearname" placeholder='Name' value={this.props.bearname} onChange={this.handleChange} />
                    </div>

                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Weight:</span>
                        </div>
                        <input type='number' name="weight" value={this.props.weight} onChange={this.handleChange} /><br />
                    </div>
                </div>

                <button id='bt' class="btn btn-primary" onClick={() => store.dispatch(addbear(this.state.bearname, this.state.weight))}>Add</button>
                <button id='bt' class="btn btn-success" >Update</button>
                <button id='bt' class="btn btn-danger"  >Delete</button>
            </div>
        )
    }
}

const mapStateToProps = ({ bears }) => { return { bears } }

const mapDispatchToProps = (dispatch) => {
    return {
        addbear: () => dispatch(addbear()),
        getBears: () => store.dispatch(getBears()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(crudBear)