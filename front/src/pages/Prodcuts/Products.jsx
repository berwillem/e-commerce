import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    axios.get(`http://localhost:5000/products?page=${page}`).then((res) => {
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    });
  }, [page]);

  return (
    <>
      {products?.map((product) => (
        <h1>{product.name}</h1>
      ))}
      <Pagination page={page} count={totalPages} onChange={handlePageChange} />
    </>
  );
};

export default Products;
