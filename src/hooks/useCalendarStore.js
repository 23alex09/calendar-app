import { id } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { eventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async ( calendarEvent ) => {
        try {

            if ( calendarEvent.id ) {
                await calendarApi.put( `/events/${calendarEvent.id}`, calendarEvent )
                //actualizando
                dispatch( onUpdateEvent( { ...calendarEvent, user } ) );
                return;
            }
            //creando
            const { data } = await calendarApi.post( '/events', { ...calendarEvent } )

            dispatch( onAddNewEvent( {
                id: data.event.id,
                ...calendarEvent,
                user,
            } ) );

        } catch ( error ) {
            Swal.fire( 'Error saving event', error.response.data.msg, 'error' );
        }
    }

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete( `/events/${activeEvent.id}` )
            //actualizando
            dispatch( onDeleteEvent() );

        } catch ( error ) {
            Swal.fire( 'Error deleting event', error.response.data.msg, 'error' );
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get( '/events' );
            const events = eventsToDateEvents( data.events );
            dispatch( onLoadEvents( events ) );
        } catch ( error ) {
            console.log( 'Error cargando eventos' )
            console.log( error )
        }
    }
    return {
        //* Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //*Functions
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}