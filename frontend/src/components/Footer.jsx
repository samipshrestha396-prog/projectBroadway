function Footer() {
  const today = new Date();
  const year = today.getFullYear();
  return <div className="text-center">&copy;Copyright {year} Pasal</div>;
}
export default Footer;