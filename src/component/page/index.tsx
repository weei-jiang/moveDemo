import React,{useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect,Link ,useHistory  } from 'react-router-dom';
import { KeepaliveRouterSwitch ,KeepaliveRoute ,addKeeperListener } from 'react-keepalive-router';
import Detail from './Detail';
import List from './List';
import HomePage from './Home';
import Sort from './Sort';
import Swipe from '../drop/Swipe'

export default function Index() {
    const menuList = [
        {
            name:"首页",
            path:"/home"
        },
        {
            name:"列表",
            path:"/list"
        },
        {
            name:"详情",
            path:"/detail"
        },
        {
            name:"排序",
            path:"/sort"
        },
        {
            name:"拖动",
            path:"/drop"
        },
    ]
    useEffect(()=>{
        /* 增加缓存监听器 */
        addKeeperListener((history: any,cacheKey: string)=>{
          if(history)console.log('当前激活状态缓存组件：'+ cacheKey )
        })
    },[])

    return (
        <div>
            <div>
                <Router>
                    <div>
                        {
                            menuList.map(router => <Link key={router.path} to={router.path}>
                                <span>{router.name} </span>
                            </Link>)
                        }
                    </div>
                    <KeepaliveRouterSwitch>
                        <Route path="/home" component={HomePage}></Route>
                        <Route path="/list" component={List} ></Route>
                        <KeepaliveRoute path="/detail" component={Detail} ></KeepaliveRoute>
                        <KeepaliveRoute path="/sort" component={Sort} ></KeepaliveRoute>
                        <KeepaliveRoute path="/drop" component={Swipe} ></KeepaliveRoute>
                        <Redirect from="/*" to='/home' />
                    </KeepaliveRouterSwitch>
                </Router>
            </div>
        </div>
    )
}
