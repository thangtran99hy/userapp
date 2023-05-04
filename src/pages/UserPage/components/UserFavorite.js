import React from "react";
import {Button, Table} from "antd";
import {NavLink} from "react-router-dom";
const UserFavorite = (props) => {
    const {
        toggleFavorites,
        userFavorites
    } = props;
    const columns = [
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: "",
            dataIndex: "detail",
            key: "detail",
            render: (text, record) => {
                return (
                    <NavLink to={`/user/${record.id}`}>
                        <Button>
                            Detail
                        </Button>
                    </NavLink>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => {
                const isFavorite = userFavorites.find(item => item.id === record.id)
                return (
                    <Button onClick={() => {
                        toggleFavorites(record)
                    }}>
                        {isFavorite ? 'Remove favorite' : 'Add to favorite'}
                    </Button>
                )
            }
        }
    ];
    return (
        <Table
            columns={columns}
            dataSource={userFavorites}
            pagination={false}
        />
    )
}

export default UserFavorite;