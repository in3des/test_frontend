import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MultipleSelectNative() {

    const [sectorValue, setSectorValue] = React.useState([]);

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const sectorsId = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                sectorsId.push(Number(options[i].value));
            }
        }
        setSectorValue(sectorsId);
        console.log(sectorsId);
    };

    return (
        <div>
            <FormControl>
                <Select
                    multiple
                    native
                    value={sectorValue}
                    // @ts-ignore Typings are not considering `native`
                    onChange={handleChangeMultiple}

                >
                    <option value="18">Grapefruit &nbsp;&nbsp;</option>
                    <option value="19">Lime</option>
                    <option value="4">Coconut</option>
                    <option value="5">Mango</option>
                    <option value="1">&nbsp;&nbsp; Information Technology and Telecommunications</option>
                </Select>
            </FormControl>
        </div>
    );
}