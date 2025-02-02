import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
    {
        id:"p1",
        price: 6,
        title: "My First Book",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequuntur culpa cupiditate"
    },
    {
        id:"p2",
        price: 5,
        title: "My Second Book",
        description: " delectus et illum impedit repudiandae soluta? Atque consectetur ex exercitationem iure quasi ullam. Debitis dolorum et illum voluptate."
    },
]
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>,
      <ul>
          {DUMMY_PRODUCTS.map((product) => (
              <ProductItem
                  id={product.id}
                  key={product.id}
                  title= {product.title}
                  price={product.price}
                  description={product.description}
              />
          ))}

      </ul>
    </section>
  );
};

export default Products;
