import Navbar from '@components/common/Navbar'
import Footer from '../Footer'

const PageLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default PageLayout
