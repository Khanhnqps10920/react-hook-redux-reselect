import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectIsShopDataFetching } from '../../redux/reducer/shop.selector';
import WithSpinner from '../../HOC/with-spinner/WithSpinner';
import CollectionOverView from './CollectionsOverview';

const mapStateToProps = createStructuredSelector({
  isShopDataFetching: selectIsShopDataFetching
});

const CollectionOverViewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionOverView);

export default CollectionOverViewContainer;
