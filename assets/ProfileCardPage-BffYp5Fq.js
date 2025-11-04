import{r as l,t as i,j as e}from"./index-D8O9hlVZ.js";import{L as m}from"./Layout-BMXIhmtk.js";function d({name:r,role:t,email:n,phone:a}){const{theme:o}=l.useContext(i),s=o==="dark";return e.jsxs("div",{className:`rounded-2xl shadow-lg p-6 w-72 text-center
        transform transition duration-300 hover:scale-105 hover:shadow-2xl
        border border-gray-300 dark:border-gray-700
        ${s?"bg-gray-900":"bg-bgColor"}
      `,children:[e.jsx("div",{className:`\r
          w-24 h-24 mx-auto rounded-full \r
          bg-gray-200 dark:bg-gray-700\r
          flex items-center justify-center mb-4\r
        `,children:e.jsx("span",{className:"text-3xl font-bold",children:r[0]})}),e.jsx("h2",{className:`text-2xl font-semibold ${s?"text-yellow-300":"text-gray-900"}`,children:r}),e.jsx("p",{className:"text-green-600 dark:text-green-400",children:t}),e.jsxs("div",{className:"mt-4 text-sm text-green-700 dark:text-green-400",children:[e.jsx("p",{children:n}),e.jsx("p",{children:a})]}),e.jsx("button",{className:`\r
          mt-4 px-4 py-2 rounded-full font-medium transition\r
          bg-green-600 text-white hover:bg-green-700\r
          dark:bg-green-500 dark:hover:bg-green-600\r
        `,children:"View Profile"})]})}function g(){const{theme:r}=l.useContext(i),t=r==="dark",n=[{name:"Thiru",role:"Frontend Developer",email:"thiru@example.com",phone:"123-456-7890"},{name:"Ram",role:"Backend Developer",email:"ram@example.com",phone:"987-654-3210"},{name:"Ravi",role:"UI/UX Designer",email:"ravi@example.com",phone:"555-234-6789"},{name:"Raju",role:"DevOps Engineer",email:"raju@example.com",phone:"555-987-6543"}];return e.jsx(m,{children:e.jsx("div",{className:`min-h-[94vh] flex flex-wrap justify-center items-center gap-6 p-10 transition-all ${t?"bg-gray-900":"bg-bgColor"}`,children:n.map((a,o)=>e.jsx(d,{...a},o))})})}export{g as default};
