import React from 'react'

const Footer = () => {
    const today = new Date()
    const year =today.getFullYear()
  return (
    <div className='text-center'> Copyright &copy;{year}</div>
  )
}

export default Footer;