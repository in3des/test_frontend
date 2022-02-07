import './App.css';
import React from "react";
import Form from "react-validation/build/form";

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

const countErrors = (errors) => {
    let count = 0;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (count = count+1)
    );
    return count;
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agree: false,
            sectorIds: null,
            username: null,
            formValid: false,
            errorCount: null,
            errors: {
                fullName: '',
                sectorsSelected: '',
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const {name, value} = event.target;

        let errors = this.state.errors;

        switch (name) {
            case 'username':
                errors.fullName =
                    value.length < 5
                        ? 'Full Name must be at least 5 characters long!'
                        : '';
                break;
            case 'sectorIds':
                errors.sectorsSelected =
                    // value.length < 3
                    value.length < 1
                        ? 'Please select at least 1 sector!'
                        : '';
                break;
        }

        this.setState({
            errors,
            [name]: value,
            [name]: target.type === 'checkbox' ? target.checked : target.value,
    });

        console.log("agree", this.state.agree);
        console.log("name", this.state.username);
        console.log("name-L", this.state.username.length);
        console.log("selected", this.state.sectorIds);
        console.log("errors", this.state.errorCount);
        console.log("valid", this.state.formValid);

        this.setState({formValid: validateForm(this.state.errors)});
        this.setState({errorCount: countErrors(this.state.errors)});
        // this.setState({sectorIds: target.value});



    }


    render() {
        const {errors, formValid} = this.state;
        return (
            <div className='App'>

                <p>
                    Please enter your name and pick the Sectors you are currently involved in.
                </p>

                <Form >

                    <div className="form-group">
                        <label>Name: &nbsp;&nbsp;&nbsp;</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="your Name"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                /> &nbsp;
                            {errors.fullName.length >= 0 &&
                                <span className="error">{errors.fullName}
                                </span>}

                    </div>



                    <br/>
                    <div className="form-group"
                         // style={{width: '300px'}}
                    >
                        Sectors: &nbsp;
                        <select
                            name="sectorIds"
                            multiple={true}
                            size="10"
                            // style={{ width: '100%' }}
                            onChange={this.handleInputChange}
                            required
                        >
                            <option value="grapefruit">Grapefruit &nbsp;&nbsp;</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                            <option value="1">&nbsp;&nbsp; Information Technology and Telecommunications</option>
                        </select> &nbsp;
                        {errors.sectorsSelected.length > 0 &&
                            <span className="error">{errors.sectorsSelected}
                                </span>}

                    </div>
                    <br/>
                    <div>
                        <input
                            name="agree"
                            type="checkbox"
                            checked={this.state.agree}
                            onChange={this.handleInputChange}
                            disabled={!this.state.formValid && !this.state.sectorIds}
                        />
                        Agree to terms
                    </div>
                    <br/>
                    <div>
                        <input type="submit" value="Save" disabled={!this.state.agree || !this.state.formValid}/>
                    </div>

                </Form>

            </div>


        );
    }

}

export default App;
