

const ChopperFields = (props) => {
    return (
        <>
            <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
            <label className='block mb-2'>Number of Passengers</label>
                <input
                className="p-2 border border-gray-100 p-2"
                id="car-count"
                name="passengers"
                data-action="grow"
                required="required"
                min="1"
                type="number"
                placeholder=""
                />
            </div>
            <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
            <label className='block mb-2'>origin</label>
                <input
                 type="text"
                 name="origin" 
                 maxlength="50" 
                 placeholder="Enter Origin" 
                 className="border border-gray-100 p-2"
                 required="required"/>
            </div>
            <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
            <label className='block mb-2'>Destination</label>
                <input
                 type="text"
                 name="destination" 
                 maxlength="50" 
                 placeholder="Enter Destination" 
                 className="border border-gray-100 p-2"
                 required="required"/>
            </div>
            <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
            <label className='block mb-2'>Select Journey Type</label>
                <select required="required" name="journey_type" className="p-2 border-gray-200">
                    <option value={""}>Select location Type</option>
                    <option value={"one_way"}>one Way</option>
                    <option value={"two_way"}>two Way</option>
                </select>
            </div>
        </>
    )
}


export default ChopperFields;