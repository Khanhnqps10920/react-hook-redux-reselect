import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectShopData = createSelector(
  [selectShop],
  shop => shop.shopData
);

export const selectShopDataForReview = createSelector(
  [selectShopData],
  shopData => Object.keys(shopData).map(key => shopData[key])
);

export const selectCategory = categoryUrlParam => {
  return createSelector([selectShopData], categories => {
    return categories[categoryUrlParam];
  });
};

export const selectIsShopDataFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectIsShopDataLoaded = createSelector(
  [selectShop],
  shop => !!shop.shopData
);
