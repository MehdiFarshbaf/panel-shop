// ** Navigation imports
import admin from "./admin"
import dashboards from "./dashboards"

import users from './users'
import category from './category'
import post from './post'
import product from './products'


// ** Merge & Export
export default [...dashboards, ...users, ...category, ...post, ...product, ...admin]
