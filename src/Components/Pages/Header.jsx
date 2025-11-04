import React, { use } from "react";

import { useContext   } from "react";
import { userContext } from "../../App";

function Header() {

  //let {user} = useContext(userContext);
  // let {user:{name}} = useContext(userContext);

  return (
    <header className="bg-green-600 text-white py-4 shadow-md">
      <h1 className="text-2xl font-bold text-center tracking-wide">REACT 30 DAYS PROJECTS</h1>
    </header>
  );
}

export default Header;
