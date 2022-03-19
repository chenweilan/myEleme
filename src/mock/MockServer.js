import Mock from 'mockjs'
import index_category from './index_category.json'
import shops from './shops.json'

import {PORT} from '../common/const'

Mock.mock(`http://127.0.0.1:${PORT}//index_category`,{Code:0,data:index_category})
Mock.mock(RegExp(`http://127.0.0.1:${PORT}/shops` + ".*"),{Code:0,data:shops})