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
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device: any) => (
                <tr key={device.id}>
                  <td>{device.id}</td>
                  <td>{device.type}</td>
                  <td>{device.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
