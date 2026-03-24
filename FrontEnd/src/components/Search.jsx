import React from "react";

const Search = ({searchTerm, setSearchTerm}) => {

    // you should never ever change that state
    // searchTerm = "I am Battman"
    // here you break two things, First the main behaviral of react
    // 1- you mutate something in child componant and that is forbiden
    // 2- AND THAT IS IMPORTATNT you changed state not by using her "set" fun

    return (
        <div className="search">
            <div>
                <img src="/search.svg" alt="search" />

                <input
                    type="text"
                    placeholder="Search through thousands of movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Search;