import { id } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector( state => state.calendar );
    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async ( calendarEvent ) => {
        //TODO: llegar al backend

        //TODO: todo bien
        if ( calendarEvent._id ) {
            //actualizando
            dispatch( onUpdateEvent( { ...calendarEvent } ) );
        } else {
            //creando
            dispatch( onAddNewEvent( {
                _id: new Date().getTime(),
                ...calendarEvent,
            } ) );
        }
    }

    const startDeletingEvent = () => {
        //Todo: llegar al backend
        dispatch( onDeleteEvent() )
    }
    return {
        //* Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //*Functions
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}