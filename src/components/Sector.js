import React from 'react';

const Sector = ({sectors, temp}) => {
    let beforeSpace = ""
    return (
        <>
            {sectors.map(data => {
                if (data.parentId != null) {
                    beforeSpace = temp + "\u00a0\u00a0\u00a0\u00a0"
                }
                return (
                    <>
                        <option value={data.id}>{`${beforeSpace}  ${data.name}`}</option>
                        {data.sectors && <Sector temp={beforeSpace} sectors={data.sectors}/>}
                    </>
                );
            })}
        </>
    );
}

export default Sector