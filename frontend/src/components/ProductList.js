import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Badge
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data.products);
            } catch (error) {
                console.error('Ürünleri yüklerken bir hata oluştu:', error);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        if (product && product.id) {
            setCart((prevCart) => [...prevCart, product]);
        } else {
            console.error('Geçersiz ürün:', product);
        }
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(product => product.id !== productId));
    };

    const placeOrder = () => {
        setIsOrderConfirmed(true);
    };

    const confirmOrder = async () => {
        console.log('Sepetteki ürünler:', cart);

        const userId = localStorage.getItem('userId');

        const productItems = cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price
        }));

        console.log('Sipariş oluşturulacak ürünler:', productItems);

        if (productItems.length === 0) {
            console.error("Sipariş oluşturulacak ürün yok.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/orders', {
                userId: userId || null,
                products: productItems
            });
            console.log('Sipariş oluşturuldu:', response.data);
            setCart([]);
            setIsOrderConfirmed(false);
        } catch (error) {
            console.error('Sipariş oluşturulurken hata:', error);
            if (error.response && error.response.data) {
                console.error('Hata mesajı:', error.response.data.message);
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Ürünler
            </Typography>
            <Grid container spacing={3}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">{product.name}</Typography>
                                    <Typography variant="h6">${product.price}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={() => addToCart(product)}
                                    >
                                        Sepete Ekle
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography>Mevcut ürün yok.</Typography>
                )}
            </Grid>

            <Typography variant="h5" gutterBottom>
                Sepet
            </Typography>
            {cart.length > 0 ? (
                <Grid container spacing={3}>
                    {cart.map((item) => (
                        <Grid item xs={12} key={item.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{item.name} - ${item.price}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        color="secondary"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Sepetten Çıkar
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography>Sepet boş.</Typography>
            )}

            <Badge
                badgeContent={cart.length}
                color="secondary"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <ShoppingCartIcon style={{ fontSize: 40 }} />
            </Badge>

            <Button
                variant="contained"
                color="primary"
                onClick={placeOrder}
                style={{ marginTop: '20px' }}
                disabled={cart.length === 0}
            >
                Sipariş Ver
            </Button>

            {isOrderConfirmed && (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={confirmOrder}
                    style={{ marginTop: '10px' }}
                >
                    Onayla
                </Button>
            )}
        </Container>
    );
};

export default ProductList;
