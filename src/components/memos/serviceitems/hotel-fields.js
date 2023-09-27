

const HotelFields = (props) => {
    return (
        <>
            <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
            <label className='block mb-2'>Number of Rooms</label>
                <input
                className="p-2 border border-gray-100 p-2"
                id="car-count"
                name="rooms_count"
                data-action="grow"
                required="required"
                min="1"
                type="number"
                placeholder=""
                />
            </div>
            
            <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
            <label className='block mb-2'>Type of Room(s)</label>
                <input
                 type="text"
                 name="room_type" 
                 maxlength="50" 
                 placeholder="Enter Room Type" 
                 className="border border-gray-100 p-2"/>
            </div>
            <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
            <label className='block mb-2'>Room Layout</label>
                <input
                 type="text"
                 name="room_layout" 
                 maxlength="50" 
                 placeholder="Enter Room Layout" 
                 className="border border-gray-100 p-2"/>
            </div>
            
        </>
    )
}


export default HotelFields;