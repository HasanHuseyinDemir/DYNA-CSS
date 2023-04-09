<img src="./image.png"/>

# DYNA-CSS
Variable Based Dynamic Css Library

# Usage
```
<div css="items"><span>First Item</span><span>Second Item</span></div>

<script>
let styles=document.css({
items:{
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}
})

//You can update after
let items=styles.items

items.color="green";
items.backgroundColor="black"

</script>
```

# Installations

## Global
```
<script src="https://unpkg.com/dyna-css@1.0.0/dynacss.js"></script>
```

## Module
```
import {css} from "https://unpkg.com/dyna-css@1.0.0/dynacss.mjs"
```

## Npm
```
npm i dyna-css
```
