import React, { Fragment, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { LocaleContext } from './contexts';

/**
 * Code Splitting using React.lazy and Suspense
 */
function LazyImport(Component) {
  const ComponentLoadable = React.lazy(Component);
  return props => (
    <Suspense
      fallback={
        <div className="container">
          <div>Loading...</div>
        </div>
      }
    >
      <ComponentLoadable {...props} />
    </Suspense>
  );
}

const ProductList = LazyImport(() => import('./pages/ProductList'));
const Product = LazyImport(() => import('./pages/Product'));

class AppRouter extends React.Component {
  state = {
    locale: 'en'
  };

  handleSetLocale = locale => this.setState({ locale });

  render() {
    const { locale } = this.state;
    return (
      <LocaleContext.Provider
        value={{ locale, setLocale: this.handleSetLocale }}
      >
        <BrowserRouter>
          <Fragment>
            <Route path="/" exact component={ProductList} />
            <Route path="/products/" component={ProductList} />
            <Route path="/product/:product" component={Product} />
          </Fragment>
        </BrowserRouter>
      </LocaleContext.Provider>
    );
  }
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));
