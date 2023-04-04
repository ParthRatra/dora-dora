import { createGlobalStyle } from "styled-components";
 const GlobalStyle =createGlobalStyle`
*{
    margin:0px;
    padding:0px;
    box-sizing:border-box;
    font-family:"montserrat"
}
body{
    background-color:#03ADF0;
}

.startname:hover{
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}


`
export default GlobalStyle;

