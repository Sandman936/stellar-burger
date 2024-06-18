import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch } from '../../services/store';
import { useSelector } from '../../services/store';
import {
  clearItems,
  selectorBurgerConstructor
} from '../../services/slices/burgerConstructorSlice';
import {
  clearOrderData,
  selectorOrder,
  selectorOrderStatus
} from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { postOrder } from '../../services/thunks';
import { userSelectors } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const bun = useSelector(selectorBurgerConstructor.selectorBun);
  const items = useSelector(selectorBurgerConstructor.selectorItems);
  const orderStatus = useSelector(selectorOrderStatus);
  const user = useSelector(userSelectors.selectorUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = {
    bun: bun,
    ingredients: items
  };

  const orderRequest = orderStatus === 'Loading';

  const orderModalData = useSelector(selectorOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    const orderData = [bun!, ...items!, bun!].map(
      (ingredient) => ingredient._id
    );
    dispatch(postOrder(orderData))
      .unwrap()
      .then(() => dispatch(clearItems()));
  };
  const closeOrderModal = () => {
    dispatch(clearOrderData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
