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
            greenOk: false,
            username: '',
            formValid: false,
            errorCount: null,
            errors: {
                fullName: '',
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let errors = this.state.errors;

        switch (name) {
            case 'username':
                errors.fullName =
                    value.length < 4
                        ? 'Full Name must be at least 5 characters long!'
                        : '';
                break;
        }

        this.setState({
            errors,
            [name]: value
        });

        console.log("agree", this.state.agree);
        console.log("name", this.state.username);
        console.log("greenOk", this.state.greenOk);
        console.log("errors", this.state.errorCount);
        console.log("valid", this.state.formValid);

        if (this.state.errorCount === 0 && this.state.agree === true) {
            this.setState({greenOk: true})
        }

        this.setState({formValid: validateForm(this.state.errors)});
        this.setState({errorCount: countErrors(this.state.errors)});

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
                                noValidate
                                />
                            {errors.fullName.length > 0 &&
                                <span className="error">{errors.fullName}
                                </span>}

                    </div>



                    <br/>
                    <div className="form-group">
                        Sectors: &nbsp;
                        <select multiple={true} size={10}>
                            <option value="grapefruit">Grapefruit</option>
                            <option value="lime">Lime</option>
                            <option selected value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select>
                    </div>
                    <br/>
                    <div>
                        <input
                            name="agree"
                            type="checkbox"
                            checked={this.state.agree}
                            onChange={this.handleInputChange}
                            disabled={!this.state.greenOk}
                        />
                        Agree to terms
                    </div>
                    <br/>
                    <div>
                        <input type="submit" value="Save" disabled={!this.state.agree}/>
                        {/*<input type="submit" value="Save" disabled={!this.state.greenOk}/>*/}
                    </div>

                </Form>

            </div>


        );
    }

}

export default App;
