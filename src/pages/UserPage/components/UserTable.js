import React, { useState, useEffect } from 'react';
import {Table, Pagination, Button} from 'antd';
import axios from 'axios';
import {NavLink} from "react-router-dom";

const UserTable = (props) => {
    const {
        toggleFavorites,
        userFavorites
    } = props;
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize]);

    const fetchData = async () => {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=${pageSize}`
        );
        setUsers(response.data);
        setTotalItems(Number(response.headers['x-total-count']));
    };

    const handlePaginationChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

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
        <>
            <Table
                columns={columns}
                dataSource={users}
                pagination={false}
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalItems}
                onChange={handlePaginationChange}
            />
        </>
    );
};

export default UserTable;
