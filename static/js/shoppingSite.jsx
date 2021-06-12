function App() {
  const [melons, setMelons] = React.useState({});
  const [shoppingCart, setShoppingCart] = React.useState({});

  const [loading, setloading] = React.useState(false);

  React.useEffect(() => {
    setloading(true);
    fetch("/api/melons")
    .then((response) => response.json())
    .then((melonData) => setMelons(melonData));
    setloading(false);
    }, [])

    React.useEffect(() => {
      const previousCart = localStorage.getItem("shoppingCart")
      if(previousCart) {
        setShoppingCart(JSON.parse(previousCart))
      }
    },[]);

    React.useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);
  

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
          { loading ? ( 
            <Loading />
          ) : (
          <AllMelonsPage melons={melons} addMelonToCart={addMelonToCart}/>
          )}
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/cart">
          { loading ? (
            <Loading />
          ) : (
          <ShoppingCartPage cart={shoppingCart} melons={melons} />
          )}
        </ReactRouterDOM.Route>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
