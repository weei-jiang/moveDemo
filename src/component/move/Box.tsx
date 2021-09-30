/* eslint-disable jsx-a11y/aria-role */
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const style = {
    // position: 'absolute',
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    cursor: 'move',
};
export const Box = ({ id, left, top, hideSourceOnDrag, children, } :any) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { id, left, top },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [id, left, top]);

    if (isDragging && hideSourceOnDrag) {
        return <div ref={drag}/>;
    }
    
    return (<div ref={drag} style={{...style, position:"absolute", left, top }} role="Box">
			{children}
		</div>);
};