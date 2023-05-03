import React, { useState, useEffect } from "react";
import axios from "axios";
import "./list.css";
import Hotplace from "../hotplace/hotplace";

axios.defaults.withCredentials = true;

function List() {

 
  return (
    <div className="main">
      <div className="body">
        
        <div>
        
          <Hotplace />
        </div>
      </div>

    </div>
  );
}

export default List;
