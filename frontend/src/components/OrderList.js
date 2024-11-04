import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const OrderList = ({ user }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Siparişleri alırken hata:", error);
            }
        };

        fetchOrders();
    }, [user]);

    return (
        <div>
            <Typography variant="h4" gutterBottom>Siparişler</Typography>
            <List>
                {orders.map((order) => (
                    <ListItem key={order.id}>
                        <ListItemText
                            primary={`Sipariş ID: ${order.id}`}
                            secondary={`Ürün ID: ${order.productId} - Sipariş Zamanı: ${new Date(order.orderTime).toLocaleString()}`}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default OrderList;
