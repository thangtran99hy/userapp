import UserTable from "./components/UserTable";
import {useEffect, useState} from "react";
import { Tabs } from 'antd';
import UserFavorite from "./components/UserFavorite";
const { TabPane } = Tabs;
const UserPage = (props) => {
    const [userFavorites, setUserFavorites] = useState(() => {
        const userFavoriteInit = JSON.parse(localStorage.getItem('userFavorites'));
        return Array.isArray(userFavoriteInit) ? userFavoriteInit : []
    });


    useEffect(() => {
        localStorage.setItem('userFavorites', JSON.stringify(userFavorites))
    }, [userFavorites])
    const toggleFavorites = (user) => {
        const isFind = userFavorites.find(item => item.id === user.id);
        if (isFind) {
            setUserFavorites(prev => prev.filter(item => item.id !== user.id))
        } else {
            setUserFavorites(prev => [...prev, user])
        }
    }
    return (
        <div style={{
            padding: 20,
        }}>
            <Tabs defaultActiveKey="1">
                <TabPane tab="List Users" key="1">
                    <UserTable toggleFavorites={toggleFavorites} userFavorites={userFavorites}/>
                </TabPane>
                <TabPane tab="Favorites" key="2">
                    <UserFavorite toggleFavorites={toggleFavorites} userFavorites={userFavorites}/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default UserPage;