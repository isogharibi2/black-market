import { baseUrl } from '@app/helpers/variables';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Productdetlais() {

  const {slug} = useParams();

    const handelchangeproducts = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/specail-offers?slug=${slug}`);
        return data
      } catch (error) {
        console.log(error)
      }
    }

    const { data : ProductSending = [] , isError , isLoading } = useQuery({
      queryKey : ["product-detail"],
      queryFn : handelchangeproducts
    });

    if (isLoading) return (
      <h1>Product Sending is loading ......</h1>
    )

    if (isError) return (
      <h1>we have a to much a error for sending the products ❗</h1>
    )

  return (
    <div>
      {ProductSending.map((products)=>(
        <h1>{products.title}</h1>
      ))}
    </div>
  )
}
