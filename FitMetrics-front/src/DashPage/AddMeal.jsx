import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import "./AddMeal.css";

function AddMeal(props) {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [mealOptions, setMealOptions] = useState([]); 
  const [selectedMeals, setSelectedMeals] = useState([]); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  const dropdownRef = useRef(null); 
  const searchInputRef = useRef(null); 

  useEffect(() => {
    props.render()
    props.meals.current = selectedMeals
  }, [selectedMeals]);

  const fetchMeals = async (query) => {

    const url = 'http://localhost:8080/search?query=' + query
    let data
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
            data = result
        }
    } catch (error) {
        console.error('Network error:', error);
    }
    const updatedData = data.map((item) => ({
      ...item,
      protein: item.protein ? item.protein.value : 0,
      carbohydrates: item.carbohydrates ? item.carbohydrates.value : 0,
      energy: item.energy ? item.energy.value : 0,
    }));
    console.log(updatedData)
    setMealOptions(updatedData); 
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

  const addMealToSelection = async (meal) => {
    setSelectedMeals([...selectedMeals, meal]);
    const url = 'http://localhost:8080/api/nutrition/add-food'
    try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${props.userJWT.current}`
          },
          body: JSON.stringify(meal)
      });

      // Handle the response
      if (response.ok) {
          const result = await response.json();
          console.log(result)
      }
    } catch (error) {
        console.error('Network error:', error);
    }
  };

  const removeMealFromSelection = async (meal) => {
    const index = selectedMeals.findIndex((m) => m === meal);
    setSelectedMeals([...selectedMeals.slice(0, index), ...selectedMeals.slice(index + 1)])
    const url = 'http://localhost:8080/api/nutrition/delete-food?foodId=' + meal.fdcId
    try {
      const response = await fetch(url, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${props.userJWT.current}`
          }
      });

      // Handle the response
      if (response.ok) {
        console.log(response)
      }
    } catch (error) {
        console.error('Network error:', error);
    }
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&!dropdownRef.current.contains(event.target) &&
      searchInputRef.current &&!searchInputRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const getSelectedElements = async() => {

    const getTodayDate = () => {
      const today = new Date();
  
      const year = today.getFullYear();
      const month = today.getMonth() + 1; // Months are zero-based
      const day = today.getDate();
  
      // Format: YYYY-MM-D
      return {date:`${year}-${month}-${day}`};
    };

    
    const data = JSON.stringify(getTodayDate())
    console.log(data)
    const url = 'http://localhost:8080/calender/all-day-data'
    try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${props.userJWT.current}`
          },
          body: data
      });

      // Handle the response
      if (response.ok) {
          const result = await response.json();
          console.log(result[1])
          setSelectedMeals(result[1])
      }
    } catch (error) {
        console.error('Network error:', error);
    }
  }

  useEffect(() => {
    getSelectedElements()
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
        {isDropdownOpen && searchQuery.trim() && mealOptions.length > 0 && (
          <div className="dropdown" ref={dropdownRef}>
            {mealOptions.map((meal, index) => (
              <div
                key={index}
                className="dropdownItem"
                onClick={async () => await addMealToSelection(meal)}
              >
                {meal.foodName}
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
                  <span className="mealName">{meal.foodName}</span>
                  <FaTrashAlt
                    className="removeIcon"
                    onClick={async() => await removeMealFromSelection(meal)}
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