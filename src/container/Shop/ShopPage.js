import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import CollectionOverViewContainer from '../../component/collections-overwiew/CollectionsOverviewContainer';
import Category from '../Category/Category';
//redux
import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/action/shop';
import { createStructuredSelector } from 'reselect';
import {
  selectIsShopDataFetching,
  selectIsShopDataLoaded,
  selectShopData
} from '../../redux/reducer/shop.selector';
//firebase
import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';
//shop data

//hoc
import WithSpinner from '../../HOC/with-spinner/WithSpinner';

const CategoryWithSpinner = WithSpinner(Category);

const ShopPage = ({
  match,
  isShopDataFetching,
  fetchCollectionsStart,
  isShopDataLoaded,
  shopData
}) => {
  let unsubscribeFromSnapshot = null;

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const data = await (
    //       await fetch(
    //         'https://firestore.googleapis.com/v1/projects/crwn-db-56dd9/databases/(default)/documents/collections'
    //       )
    //     ).json();

    //     console.log(data);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };

    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  console.log(isShopDataLoaded);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        render={props => {
          console.log(props);

          return (
            <CollectionOverViewContainer
              isLoading={isShopDataFetching}
              {...props}
            />
          );
        }}
      />
      <Route
        path={`${match.path}/:categoryId`}
        render={props => (
          <CategoryWithSpinner
            isLoading={Object.keys(shopData).length > 0 ? false : true}
            {...props}
          />
        )}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isShopDataFetching: selectIsShopDataFetching,
  isShopDataLoaded: selectIsShopDataLoaded,
  shopData: selectShopData
});

const mapActionToProps = {
  fetchCollectionsStart
};

export default connect(mapStateToProps, mapActionToProps)(ShopPage);
