import React, {useEffect, useState} from "react";
import {NavLink, useParams} from 'react-router-dom';
import axios from "axios";
import {Button, Spin} from 'antd';
import { Descriptions } from 'antd';

const UserDetail = (props) => {
    const { id } = useParams();
    const [user, setUser] = useState(undefined);
    const [userFavorites, setUserFavorites] = useState(() => {
        const userFavoriteInit = JSON.parse(localStorage.getItem('userFavorites'));
        return Array.isArray(userFavoriteInit) ? userFavoriteInit : []
    });
    useEffect(() => {
        localStorage.setItem('userFavorites', JSON.stringify(userFavorites))
    }, [userFavorites])
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => {
                setUser(res.data)
            })
            .catch(err =>{
                setUser(null)
            })
    }, [])
    const toggleFavorites = (user) => {
        const isFind = userFavorites.find(item => item.id === user.id);
        if (isFind) {
            setUserFavorites(prev => prev.filter(item => item.id !== user.id))
        } else {
            setUserFavorites(prev => [...prev, user])
        }
    }
    if (!user) {
        if (user === null) {
            return   <div style={{
                padding: 20
            }}>
                <NavLink to={"/"}>
                    <Button>
                        {"<"} Go To List
                    </Button>
                </NavLink>
                <div>
                    Not found user
                </div>
            </div>
        }
        return (
            <Spin />
        )
    }
    const isFavorite = userFavorites.find(item => item.id === user.id)

    return (
        <div style={{
            padding: 20
        }}>
            <NavLink to={"/"}>
                <Button>
                    {"<"} Go To List
                </Button>
            </NavLink>
            <Descriptions title="User Info">
                <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
                <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                <Descriptions.Item label="UserName">{user.username}</Descriptions.Item>
                <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Email">{user.website}</Descriptions.Item>
                <Descriptions.Item label="Address">
                    {user.address?.suite ?? ''} {user.address?.street ?? ''} {user.address?.city ?? ''} {user.address?.zipcode ?? ''}
                </Descriptions.Item>
                <Descriptions.Item label="Company">{user.company?.name ?? ''}</Descriptions.Item>
            </Descriptions>
            <Button onClick={() => {
                toggleFavorites(user)
            }}>
                {isFavorite ? 'Remove favorite' : 'Add to favorite'}
            </Button>
        </div>
    )
}

export default UserDetail;