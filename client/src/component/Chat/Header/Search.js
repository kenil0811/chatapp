import React, { useRef, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';

function Search({ ...props }) {
    // console.log(props);
    const inputElm = useRef("");
    const [state, setState] = useState({ clicked: false });
    const handleClick = () => {
        setState({ clicked: !state.clicked })
    }
    const getSearchTerm = () => {
        props.searchKeyword(inputElm.current.value);
    }
    return (
        <div className="search">
            <IconButton onClick={handleClick}><SearchIcon /></IconButton>
            <input ref={inputElm} type="text" placeholder={"Search"} className={state.clicked ? null : "active"} value={props.term} onChange={getSearchTerm} />
        </div>
    )
}

export default Search
