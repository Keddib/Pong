import { useState } from "react";

const SearchParams = () => {

  const [location, setLocation] = useState("Morocco");

	var eventHundler = (e) => {
    setLocation(e.target.value);
  };
	
  return (
    <div className="search-params">
      <form>
        <label htmlFor="">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={eventHundler}
          />
        </label>
        <button> submit </button>
      </form>
    </div>
  );
};

export default SearchParams;
