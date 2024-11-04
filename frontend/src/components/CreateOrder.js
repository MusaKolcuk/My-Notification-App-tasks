import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography } from '@mui/material';

const CreateOrder = ({ user, selectedProduct }) => {
    const [orderStatus, setOrderStatus] = useState('');

    const handleCreateOrder = async () => {
        if (!selectedProduct || !selectedProduct.id) {
            setOrderStatus("Lütfen bir ürün seçiniz.");
            return;
        }

        const userId = user ? user.id : null;

        console.log("Kullanıcı Bilgisi:", user);
        console.log("Kullanıcı ID'si:", userId);

        try {
            const response = await axios.post('http://localhost:5000/api/orders', {
                userId: userId,
                products: [{ id: selectedProduct.id }],
            }, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setOrderStatus(response.data.message);
        } catch (error) {
            console.error("Sipariş oluştururken hata:", error);
            setOrderStatus("Sipariş oluşturulurken bir hata oluştu.");
        }
    };

    return (
        <div>
            <Typography variant="h6">Yeni Sipariş Oluştur</Typography>
            <Button variant="contained" color="primary" onClick={handleCreateOrder}>
                Siparişi Oluştur
            </Button>
            {orderStatus && <Typography>{orderStatus}</Typography>}
        </div>
    );
};

export default CreateOrder;
