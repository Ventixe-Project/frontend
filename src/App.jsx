
import './App.css'
import CenterLayout from './components/layouts/CenterLayout'

function App() {

  return (
    <Routes>
      <Route path="/events" element={<CenterLayout />}>      </Route>
      <Route path="/events/:eventId" element={<CenterLayout />}>  </Route>
      <Route path="/bookings" element={<CenterLayout />}>     </Route>

      </Routes>
  )
}

export default App
