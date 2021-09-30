/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from 'react';
import { Container } from './Container';

function Move() {
    const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true);
    // const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
    //     hideSourceOnDrag,
    // ]);
    return (
        <div style={{display:"flex",justifyContent:"center",marginTop:"50px"}}>
            <Container hideSourceOnDrag={hideSourceOnDrag}/>
            {/* <p>
				<label htmlFor="hideSourceOnDrag">
					<input id="hideSourceOnDrag" type="checkbox" role="checkbox" checked={hideSourceOnDrag} onChange={toggle}/>
					<small>Hide the source item while dragging</small>
				</label>
			</p> */}
        </div>
    )
}

export default Move
