import './App.css';
import React from "react";
import Form from "react-validation/build/form";
import SectorService from "./services/SectorService";
import FormService from "./services/FormService";
import Sector from "./components/Sector";

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

const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const sectorsId = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
            sectorsId.push(Number(options[i].value));
        }
    }
    // console.log("array", sectorsId);
    // console.log("array-L", sectorsId.length);

    return sectorsId;
};


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            username: null,
            sectorsId: [],
            agree: false,
            sectors: [],
            sectorValue: [],
            formValid: false,
            errorCount: null,
            errors: {
                fullName: '',
                sectorsSelected: '',
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    componentDidMount() {
        SectorService.getAllSectors()
            .then(resp => {
                let data = resp.data
                this.setState({
                    sectors: data
                })
            })
            .catch(e => {
                console.log(e);
            })
    }


    handleInputChange(event) {
        const target = event.target;
        const {name, value} = event.target;

        let errors = this.state.errors;

        // eslint-disable-next-line default-case
        switch (name) {
            case 'username':
                errors.fullName =
                    value.length < 5
                        ? 'Full Name must be at least 5 characters long!'
                        : '';
                break;
            case 'sectorsId':
                errors.sectorsSelected =
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

        // console.log("agree", this.state.agree);
        // console.log("name", this.state.username);
        console.log("name-L", this.state.username?.length);
        // console.log("sectorsId", this.state.sectorsId);
        // console.log("sectorsId-L", this.state.sectorsId.length);
        console.log("sectorValue", this.state.sectorValue.length);
        // console.log("errors", this.state.errorCount);
        // console.log("errors{}", this.state.errors);
        console.log("valid", this.state.formValid);
        // console.log("value", this.state.value);
        // console.log("disabled state --- ", !this.state.username > 4 || !this.state.sectorValue.length > 0)
        console.log("disabled state --- ", !(this.state.username?.length > 4 && this.state.sectorValue.length > 0))

        this.setState({formValid: validateForm(this.state.errors)});
        this.setState({errorCount: countErrors(this.state.errors)});
        this.setState({sectorValue: handleChangeMultiple(event)})
    }



    createForm = (e) => {
        e.preventDefault()
        FormService.createForm(
            this.state.username,
            this.state.agree,
            this.state.sectorValue)
            .then(resp => {
                let data = resp.data
                this.setState({
                    id: data.id,
                    username: data.username,
                    agree: data.agreement,
                    sectorValue: data.sectors.map(sector => sector.id)
                })
            })
            .catch(e => {
                console.log(e);
            })
    }

    updateForm = (e) => {
        e.preventDefault()
        FormService.updateForm(
            this.state.id,
            this.state.username,
            this.state.agree,
            this.state.sectorValue)
            .then(resp => {
                let data = resp.data
                this.setState({
                    id: data.id,
                    username: data.username,
                    agree: data.agreement,
                    sectorValue: data.sectors.map(sector => sector.id)
                })
            })
            .catch(e => {
                console.log(e);
            })
    }

    getSectors = () => {
        return (
            <>
                <Sector sectors={this.state.sectors}/>
            </>
        )
    }

    submitCreateOrUpdate = () => {
        return this.state.id == null
            ? this.createForm
            : this.updateForm
    }


    render() {
        const {errors} = this.state;
        return (
            <div className='App'>

                <p>
                    Please enter your name and pick the Sectors you are currently involved in.
                </p>

                <Form onSubmit={this.submitCreateOrUpdate()}>

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
                    <div className="form-group">
                        Sectors: &nbsp;
                        <select
                            name="sectorsId"
                            multiple
                            native
                            size={10}
                            value={this.state.sectorValue}
                            onChange={this.handleInputChange}
                            required
                        >
                            {this.getSectors()}
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
                            // disabled={!this.state.sectorValue.length > 0 || this.state.username.length === 0}
                            // disabled={!this.state.formValid || !this.state.sectorValue.length > 0}
                            disabled={!(this.state.username?.length > 4 && this.state.sectorValue.length > 0)}
                        />
                        Agree to terms
                    </div>
                    <br/>
                    <div>
                        <input type="submit" value="Save" disabled={!this.state.formValid || !this.state.agree}/>
                    </div>

                </Form>

            </div>


        );
    }

}

export default App;
