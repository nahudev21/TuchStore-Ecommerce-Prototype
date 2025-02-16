import React from 'react'
import { useParams } from 'react-router-dom'

export default function CategoryProduct() {

 const { categoryName } = useParams();  
    
  return (
    <div>
      {categoryName}
    </div>
  )
}
