import React, { useState, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  // const [total, setTotal] = useState('');
  // const [quantity, setQuantity] = useState(0);

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    let sum = 0;

    products.forEach(product => {
      sum += product.quantity * product.price;
    });

    return formatValue(sum);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    let sum = 0;

    products.forEach(product => {
      sum += product.quantity;
    });

    return sum;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
