import React, {lazy,Suspense} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Home = lazy(() => import('../Pages/Home/Home' /* webpackChunkName: "Home" */))
const AppRoutes: React.FC<any> = React.memo(() => {
    return <Suspense>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    </Suspense>
  })

export default AppRoutes