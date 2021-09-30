import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Move from '../move'

export default function Detail() {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <Move />
            </DndProvider>
        </div>
    )
}
