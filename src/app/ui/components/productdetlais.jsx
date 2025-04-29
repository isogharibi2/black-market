import { baseUrl } from '@app/helpers/variables'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'

export default function Productdetlais() {

  const [getedItems, setGetdItems] = useState("")

  const GetProInf = async () => {
    try {
      const { itemed } = await axios.get(`${baseUrl}/specail-offers`);
      return itemed
    } catch (err) {
      console.log(err)
    }
  }

  const { itemed : Items } = useQuery({
    queryKey: ["Items", getedItems],
    GetProInf,
  })

  return (
    <section>
      <div className='HeroInfo'>
        |{Items.map((ItemS)=>(
          <div key={ItemS.id}>
            
          </div>
        ))}
      </div>
      <div className='HeroIg'>

      </div>
    </section>
  )
}
