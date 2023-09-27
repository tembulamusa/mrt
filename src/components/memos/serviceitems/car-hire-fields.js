

const CarHireFields = (props) => {
    return (
        <>
            <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
            <label className='block mb-2'>Number of cars</label>
                <input
                className="p-2 border border-gray-100 p-2"
                id="car-count"
                name="car_count"
                data-action="grow"
                required="required"
                min="1"
                type="number"
                placeholder=""
                />
            </div>
            
            <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
            <label className='block mb-2'>Car Type</label>
                <input
                 type="text"
                 name="car_type" 
                 maxlength="50" 
                 placeholder="Enter Car Type" 
                 className="border border-gray-100 p-2"
                 required="required"/>
            </div>
            

            <div className="form-group col-12 justify-content-center mt-3 flex flex-col">
            <label className='block mb-2'>Select Car Category</label>
                <select required="required" name="car_category" className="p-2 border-gray-200">
                <option value={""}>Select Category</option>
                <option >economy</option>
                <option >luxury</option>
                <option >suv</option>
                <option >people carrier</option>
                </select>
            </div>
            
        </>
    )
}


export default CarHireFields;