function App() {
  const [melons, setMelons] = React.useState({});
  const [shoppingCart, setShoppingCart] = React.useState({})

  React.useEffect(() => {
    fetch("/api/melons")
    .then((response) => response.json())
    .then((melonData) => setMelons(melonData));
    }, [])

    function addMelonToCart(melonCode){
      setShoppingCart((currentShoppingCart) => {
        const newShoppingCart = Object.assign({}, currentShoppingCart);

        if(newShoppingCart[melonCode]) {
          newShoppingCart[melonCode] += 1;
        } else
        {
          newShoppingCart[melonCode] = 1;
        }
        return newShoppingCart;
      });
    }

  return (
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="/static/img/watermelon.png" brand="Ubermelon">
        <ReactRouterDOM.NavLink
          to="/shop"
          activeClassName="navlink-active"
          className="nav-link"
        >
          Shop for Melons
        </ReactRouterDOM.NavLink>
        <ReactRouterDOM.NavLink
          to="/cart"
          activeClassName="navlink-active"
          className="nav-link"
        >
          Shopping Cart
        </ReactRouterDOM.NavLink>
      </Navbar>

      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/">
          <Homepage />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/shop">
          <AllMelonsPage melons={melons} />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/cart">
          <ShoppingCartPage />
        </ReactRouterDOM.Route>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
