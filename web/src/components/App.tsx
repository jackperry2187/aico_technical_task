import { useEffect, useState } from 'react'

function App() {
  const [devices, setDevices] = useState<Object[]>([])

  useEffect(() => {
    const getList = async () => {
      const list = await fetch('/list');
      const data = await list.json();
      setDevices(data);
    }
    
    getList();
  }, [setDevices])

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="h-screen sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="text-center">
          a table will go here eventually ({devices.length} devices loaded)
        </div>
      </div>
    </div>
  )
}

export default App
