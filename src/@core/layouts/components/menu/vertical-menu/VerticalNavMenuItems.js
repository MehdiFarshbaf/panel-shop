// ** Vertical Menu Components
import VerticalNavMenuLink from "./VerticalNavMenuLink"
import VerticalNavMenuGroup from "./VerticalNavMenuGroup"
import VerticalNavMenuSectionHeader from "./VerticalNavMenuSectionHeader"

// ** Utils
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from "@layouts/utils"
import { Navigate } from "react-router-dom"

const VerticalMenuNavItems = props => {
  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader
  }
  // ** Render Nav Menu Items
  const data = JSON.parse(localStorage.getItem('userData'))
  
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)]
    
    if (item.children) {
      return <TagName item={item} index={index} key={item.id} {...props} />
    }
    if (item.key) {
      if (data?.role?.permissions?.find(permission => permission.key.trim() === item.key.trim())) {
        return <TagName key={item.header} item={item} {...props} />
      }
      
    } else {
      return <TagName key={item.header} item={item} {...props} />
      
    }
    
    
  })
  
  return RenderNavItems
}

export default VerticalMenuNavItems
