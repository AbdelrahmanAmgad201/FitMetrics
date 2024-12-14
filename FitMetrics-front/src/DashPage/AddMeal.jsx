import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import "./AddMeal.css";

function AddMeal() {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [mealOptions, setMealOptions] = useState([]); 
  const [selectedMeals, setSelectedMeals] = useState([]); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  const dropdownRef = useRef(null); 
  const searchInputRef = useRef(null); 

  const fetchMeals = async (query) => {

    const url = 'http://localhost:8080/search?query=' + query
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Handle the response
        if (response.ok) {
            const result = await response.json();
            console.log(result)
        }
    } catch (error) {
        console.error('Network error:', error);
    }
    const data = ["chicken"]
    const filteredData = data.filter((meal) =>
      meal.toLowerCase().includes(query.toLowerCase())
    );
    setMealOptions(filteredData); 
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const onSearch = () => {
    if (searchQuery.trim()) {
      fetchMeals(searchQuery); 
      setIsDropdownOpen(true);
    } else {
      setMealOptions([]); 
      setIsDropdownOpen(false); 
    }
  };

  const filteredMeals = mealOptions.filter(
    (meal) => !selectedMeals.includes(meal)
  );

  const addMealToSelection = (meal) => {
    if (!selectedMeals.includes(meal)) {
      setSelectedMeals([...selectedMeals, meal]); 
    }
  };

  const removeMealFromSelection = (meal) => {
    setSelectedMeals(selectedMeals.filter((m) => m !== meal)); 
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&!dropdownRef.current.contains(event.target) &&
      searchInputRef.current &&!searchInputRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="addMeal">
      <div className="searchContainer">
        <div className="rectangle">
          <h2 className="title">Add Meal</h2>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for a meal"
            className="searchInput"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FaSearch className="searchIcon" onClick={onSearch} />
        </div>
      </div>
      <div className="other-than-search">
        {isDropdownOpen && searchQuery.trim() && filteredMeals.length > 0 && (
          <div className="dropdown" ref={dropdownRef}>
            {filteredMeals.map((meal, index) => (
              <div
                key={index}
                className="dropdownItem"
                onClick={() => addMealToSelection(meal)}
              >
                {meal}
              </div>
            ))}
          </div>
        )}

        <div className="selectedMeals">
          <h3>Selected Meals:</h3>
          {selectedMeals.length > 0 ? (
            <div className="mealList">
              {selectedMeals.map((meal, index) => (
                <div key={index} className="mealItem">
                  <span className="mealName">{meal}</span>
                  <FaTrashAlt
                    className="removeIcon"
                    onClick={() => removeMealFromSelection(meal)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No meals selected yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddMeal;